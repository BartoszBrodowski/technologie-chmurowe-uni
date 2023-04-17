from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def get_data():
    arg1 = request.args.get('arg1')
    with open('./data/file.txt', 'a') as f:
        f.write(f'arg1={arg1},')
    return "Argument saved to file"

if __name__ == '__main__':
    app.run(port=os.getenv("APP_PORT"), debug=True)
