# backend/model.py
import cv2
import numpy as np
from transformers import pipeline
from PIL import Image, ImageOps
import torch
import io
import base64

class DualModelDetector:
    def __init__(self):
        print("⏳ Loading Models...")
        device = 0 if torch.cuda.is_available() else -1
        
        # MODEL 1: GenAI Detector
        print("  1. Loading GenAI Detector (v2.0)...")
        self.genai_pipe = pipeline("image-classification", model="prithivMLmods/AI-vs-Deepfake-vs-Real-v2.0", device=device)

        # MODEL 2: Face Deepfake Detector
        print("  2. Loading Face Deepfake Detector (v2)...")
        self.face_pipe = pipeline("image-classification", model="prithivMLmods/Deep-Fake-Detector-v2-Model", device=device)

        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        print("✅ System Ready: Visual Debug Mode Active")

    def img_to_base64(self, img):
        """Converts a PIL Image to a Base64 string for the frontend"""
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG")
        return base64.b64encode(buffered.getvalue()).decode("utf-8")

    def predict(self, image: Image.Image):
        try:
            if image.mode != "RGB":
                image = image.convert("RGB")

            # --- PHASE 1: GENAI DETECTION ---
            genai_results = self.genai_pipe(image)
            genai_top = genai_results[0]
            genai_score = genai_top['score']
            is_ai_art = "artificial" in genai_top['label'].lower()
            
            genai_label = "Real Image"
            if is_ai_art and genai_score > 0.6:
                 genai_label = "AI Generated Art"

            genai_data = {
                "is_detected": is_ai_art,
                "confidence": genai_score,
                "label": genai_label
            }

            # --- PHASE 2: FACE DETECTION ---
            open_cv_image = np.array(image)
            open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2BGR)
            gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
            
            faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
            
            deepfake_data = {
                "face_found": False,
                "is_detected": False,
                "confidence": 0.0,
                "label": "No Face Found"
            }

            # Default to full image if no face (so we can still see what it saw)
            target_face_image = image 

            if len(faces) > 0:
                deepfake_data["face_found"] = True
                sorted_faces = sorted(faces, key=lambda b: b[2] * b[3], reverse=True)
                x, y, w, h = sorted_faces[0]

                # Ratio Check logic
                image_area = image.width * image.height
                face_area = w * h
                face_ratio = face_area / image_area

                if face_ratio > 0.20:
                    # Case A: Large Face (Portrait) -> Use Full Image
                    target_face_image = image
                else:
                    # Case B: Small Face -> Crop it
                    max_dim = max(w, h)
                    margin = int(max_dim * 0.6)
                    center_x = x + w // 2
                    center_y = y + h // 2
                    left = max(0, center_x - (max_dim + margin) // 2)
                    top = max(0, center_y - (max_dim + margin) // 2)
                    right = min(image.width, center_x + (max_dim + margin) // 2)
                    bottom = min(image.height, center_y + (max_dim + margin) // 2)
                    target_face_image = image.crop((left, top, right, bottom))

            # Preprocess (Pad to Square)
            target_face_image = ImageOps.pad(target_face_image, (224, 224), color="black")

            # --- GENERATE DEBUG IMAGE ---
            # This is the exact pixel data the AI is analyzing
            debug_b64 = self.img_to_base64(target_face_image)

            # Run Deepfake Model
            face_results = self.face_pipe(target_face_image)
            face_top = face_results[0]
            
            is_deepfake = "fake" in face_top['label'].lower() or "deepfake" in face_top['label'].lower()
            deepfake_score = face_top['score']

            SAFE_THRESHOLD = 0.55
            if is_deepfake and deepfake_score < SAFE_THRESHOLD:
                is_deepfake = False
                deepfake_score = 0.0

            deepfake_data.update({
                "is_detected": is_deepfake,
                "confidence": deepfake_score,
                "label": "Deepfake Face" if is_deepfake else "Real Face"
            })

            return {
                "genai_analysis": genai_data,
                "deepfake_analysis": deepfake_data,
                "final_verdict": self._get_verdict(genai_data, deepfake_data),
                "debug_image": debug_b64 # <--- SENDING IMAGE BACK
            }

        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()
            return {"error": str(e)}

    def _get_verdict(self, genai, deepfake):
        if deepfake['face_found'] and deepfake['is_detected']:
            return "Deepfake Detected"
        if genai['is_detected']:
            return "AI Generated Image"
        return "Real Image"