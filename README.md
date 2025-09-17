# DeepVision-DetectionOfDeepFakes
A full-stack web application designed to detect DeepFake videos using a Convolutional Neural Network (CNN). This tool provides a user-friendly interface to upload a video and receive a prediction on whether it's real or fake.

## 📖 About The Project

In an age of rampant misinformation, DeepFake technology poses a significant threat to digital trust. This project aims to provide an accessible tool to distinguish between authentic and manipulated videos. It leverages a powerful deep-learning model on the backend, served through a REST API, and a modern, responsive frontend for a seamless user experience.

## ✨ Key Features

• Image Analysis: Upload images directly for analysis.

• Real-time Prediction: Get a clear probability score indicating if the image is REAL or FAKE.

• Responsive UI: A clean and modern user interface built with React and TailwindCSS that works on all devices.

• Scalable Backend: A robust Flask backend to handle API requests and run the deep learning model.

## 🛠️ Tech Stack

This project is built with a modern, full-stack architecture:

• Frontend:

- React: A JavaScript library for building user interfaces.
- TailwindCSS: A utility-first CSS framework for rapid UI development.

•Backend:

- Flask: A lightweight Python web framework for the REST API.
- Python: Core language for backend logic and model inference.

• CNN Model:
- Convolutional Neural Network (CNN): A custom-trained CNN model, built with PyTorch for image classification.

## 🏗️ How It Works

The application follows a simple client-server architecture.

• User Interaction: The user uploads a image through the React frontend.

• API Request: The frontend sends the image file to the Flask backend via a POST request.

• Image Processing: The Flask server receives the image, preprocesses them for the model.

• Model Inference: The preprocessed image is fed into the pre-trained CNN model, which predicts the probability of the image being a DeepFake.

• API Response: The backend sends the prediction result (e.g., { "prediction": "FAKE", "confidence": 0.92 }) back to the frontend.

• Display Result: The React frontend displays the result to the user in an intuitive way.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:
• Node.js & npm

    npm install npm@latest -g

• Python 3.8+ & pip
• A virtual environment tool like venv or conda.

### Installation

• Clone the repository:

`git clone https://github.com/your-username/deepfake-detection.git`
`cd deepfake-detection`

• Backend Setup (Flask & CNN):
# Navigate to the backend directory
`cd backend`
# Create and activate a virtual environment
`python -m venv venv`
`source venv/bin/activate`  # On Windows, use `venv\Scripts\activate`

# Install Python dependencies
`pip install -r requirements.txt`

# Download the pre-trained model weights (if necessary) and place them in the 'model' directory.

• Frontend Setup (React):
# Navigate to the frontend directory from the root
`cd ../frontend`

# Install NPM packages
`npm install`

## 🏃 Usage
• Run the Backend Server:
- From the /backend directory, with your virtual environment activated, run:
`flask run`
- The API server will start on http://127.0.0.1:5000.

• Run the Frontend Application:
- From the /frontend directory, run:

`npm start`

- The React app will open automatically in your browser at http://localhost:3000.
- 
• Detect a DeepFake:

- Open your browser to http://localhost:3000.
- Click the "Upload image" button and select a video file.
- Wait for the analysis to complete, and the result will be displayed on the screen!

## 🧠 The Model

The core of this project is a Convolutional Neural Network (CNN).
• Architecture: The model based on ResNet optimized for facial feature extraction.
• Training Data: trained on FaceForensics++, Celeb-DF
• Performance: The model achieves an accuracy of 70% on our test set, demonstrating its effectiveness in identifying manipulated images.

## 📄 License

Distributed under the MIT License. See LICENSE.txt for more information.

##Contributors

Sandeep Kumar Jena
Shamanth S Joshi
Sudhanva H Rao
