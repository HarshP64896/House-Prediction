from flask import Flask, request, jsonify

import util

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/get_location_names', methods=['POST', 'GET'])
def get_location_names():
    response = jsonify({
        'location': util.get_location_names()
    })
    return response

@app.route('/predict_home_price', methods=['POST', 'OPTIONS'])
def predict_home_price():
    if request.method == 'OPTIONS':
        return '', 200  # Handle preflight request
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bath = int(request.form['bath'])
    bhk = int(request.form['bhk'])

    response = jsonify({
        'estimated_price': util.get_estmiated_price(location, total_sqft, bath, bhk)
    })
    return response

if __name__ == "__main__":
    print("Starting Flask Server For Home Prediction")
    util.load_saved_artifcats()
    app.run()
