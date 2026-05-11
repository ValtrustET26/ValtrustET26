from flask import Flask,request,jsonify
import pytesseract
import cv2
import numpy as np
from flask_cors import CORS
from pdf2image import convert_from_bytes

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

        filename = file.filename.lower()

        if filename.endswith('.pdf'):

            pdf_bytes = file.read()

            pages = convert_from_bytes(pdf_bytes)

            for page in pages:
                img = np.array(page)
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

                text = pytesseract.image_to_string(gray, lang="spa+eng")
                textos.append(text)
        else:
            npimg = np.frombuffer(file.read(), np.uint8)
            img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            texto = pytesseract.image_to_string(gray, lang='spa+eng')   
            textos.append(texto)

    texto_completo = "\n".join(textos)
    return jsonify({"texto_completo": texto_completo})

app.run(debug=True)