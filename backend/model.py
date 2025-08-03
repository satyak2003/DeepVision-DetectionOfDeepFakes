# backend/model.py
import torch
from torchvision import models, transforms
import torch.nn as nn
from PIL import Image
from torch.serialization import safe_globals
import torchvision.models.resnet

class DeepfakeDetector:
    def __init__(self, model_path, device=None):
        self.device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load model architecture (use weights=None instead of pretrained=False)
        self.model = models.resnet18(weights=None)
        num_features = self.model.fc.in_features
        self.model.fc = nn.Linear(num_features, 2)  # 2 classes: Real, Fake

        # Define all classes that need to be allowed during model loading
        allowed_globals = [
            torchvision.models.resnet.ResNet,
            torchvision.models.resnet.BasicBlock,  # This was missing and causing the error
            torch.nn.modules.conv.Conv2d,
            torch.nn.modules.batchnorm.BatchNorm2d,
            torch.nn.modules.linear.Linear,
            torch.nn.modules.activation.ReLU,
            torch.nn.modules.container.Sequential,
            torch.nn.modules.pooling.AdaptiveAvgPool2d,
            torch.nn.modules.pooling.MaxPool2d,
            torch.nn.parameter.Parameter,
            torch.Tensor,
            torch.nn.Module,
        ]

        # Load model weights with safe globals context
        with safe_globals(allowed_globals):
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))

        self.model.to(self.device)
        self.model.eval()

        # Image preprocessing pipeline matching training transforms
        self.transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5]*3, std=[0.5]*3),
        ])

        self.labels = ['Deepfake', 'Real']

    def predict(self, image: Image.Image):
        # Preprocess image
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(input_tensor)
            _, pred_idx = torch.max(output, 1)

        return self.labels[pred_idx.item()]
