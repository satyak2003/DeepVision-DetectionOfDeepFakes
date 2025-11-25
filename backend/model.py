from transformers import pipeline
from PIL import Image

class MultiModelDetector:
    def __init__(self):
        print("⏳ Initializing Models...")
        
        # Model 1: Best for Deepfakes (Face Swaps, Face2Face)
        print("  1. Loading Deepfake (Face) Model...")
        self.face_pipe = pipeline("image-classification", model="dima806/deepfake_vs_real_image_detection")
        
        # Model 2: Best for GenAI (DALL-E 3, Midjourney, Stable Diffusion)
        print("  2. Loading GenAI (Synthetic) Model...")
        self.genai_pipe = pipeline("image-classification", model="umm-maybe/AI-image-detector")
        
        print("✅ Both Models Loaded Successfully!")

    def predict(self, image: Image.Image, model_type: str):
        # Ensure image is RGB
        if image.mode != "RGB":
            image = image.convert("RGB")

        # Select the correct pipeline
        if model_type == 'genai':
            results = self.genai_pipe(image)
        else:
            # Default to deepfake/face model
            results = self.face_pipe(image)
            
        # Parse results (Both models return slightly different label strings)
        top_result = results[0]
        raw_label = top_result['label'].lower()
        score = top_result['score']

        # NORMALIZE LABELS:
        # We want to return standard "Deepfake" or "Real" to the frontend
        
        final_label = "Real" # Default
        
        # Logic for GenAI Model (returns 'artificial', 'human')
        if model_type == 'genai':
            if 'artificial' in raw_label or 'ai' in raw_label:
                final_label = "Deepfake"
        
        # Logic for Face Model (returns 'FAKE', 'REAL')
        else: 
            if 'fake' in raw_label:
                final_label = "Deepfake"

        return {
            "label": final_label,
            "confidence": score,
            "used_model": model_type
        }