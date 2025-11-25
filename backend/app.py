from flask import Flask, request, jsonify
from flask_cors import CORS
from model import MultiModelDetector
from PIL import Image

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": ["*"] 
    }
})

# Initialize the Multi-Model Detector
detector = MultiModelDetector()

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    # Get the model selection from the form data (default to 'deepfake')
    model_type = request.form.get('model_type', 'deepfake')

    try:
        image = Image.open(file.stream)
        
        # Pass both image and choice to the detector
        result = detector.predict(image, model_type)
        
        return jsonify(result)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)