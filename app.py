from flask import Flask, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# AI prediction logic (basic version)
def predict_big_small(a, b, c):
    result = (a + b + c) ** 2 % 10
    return "Big" if result >= 5 else "Small"

# Get current Myanmar time and generate period format
def get_current_period():
    now = datetime.utcnow() + timedelta(hours=6, minutes=30)
    return now.strftime("%Y%m%d%H%M%S%f")[:17]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    a, b, c = int(data['a']), int(data['b']), int(data['c'])

    prediction = predict_big_small(a, b, c)
    period = get_current_period()

    return jsonify({
        'period': period,
        'prediction': prediction,
        'mmt_time': datetime.utcnow() + timedelta(hours=6, minutes=30)
    })

if __name__ == '__main__':
    app.run(debug=True)
