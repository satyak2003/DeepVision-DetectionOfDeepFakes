# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import DeepfakeDetector
from utils import read_image
import os

app = Flask(__name__)
CORS(app)

# Path to your saved model
MODEL_PATH = os.path.join('trained_models', 'deepvision_v1.pth')
detector = DeepfakeDetector(MODEL_PATH)

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        image = read_image(file)
        label = detector.predict(image)
        return jsonify({'prediction': label})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# You can add more endpoints here for login, register, etc.

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
