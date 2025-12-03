# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import DualModelDetector
from PIL import Image

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize the Dual Expert
detector = DualModelDetector()

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    
    try:
        image = Image.open(file.stream)
        # Returns the combined analysis
        result = detector.predict(image)
        return jsonify(result)

    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)