from flask import Flask,request,jsonify
import pytesseract
import cv2
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "Servidor funcionando"

@app.route('/upload', methods=['POST'])
def upload():
    files = request.files.getlist("images")

    textos = []

    for file in files:
        npimg = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        texto = pytesseract.image_to_string(gray, lang='spa+eng')
        textos.append(texto)

        texto_completo = "\n".join(textos)

    return jsonify({"texto_completo": texto_completo})

app.run(debug=True)