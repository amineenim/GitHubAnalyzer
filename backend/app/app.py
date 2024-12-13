from flask import Flask, jsonify, request
import requests

app = Flask(__name__)
GITHUB_API_URL = "https://api.github.com"


@app.route('/api/health', methods=["GET"])
def health_check():
    return jsonify({"status" : "healthy"}), 200

@app.route('/api/profile', methods=["GET"])
def get_github_profile():
    # get the username from query Params
    username = request.args.get('username')
    if not username:
        return jsonify({"error" : "Username is required"}),400
    try:
        #Fetch user data from Github API
        response = requests.get(f"{GITHUB_API_URL}/users/{username}")
        response.raise_for_status()
        user_data = response.json()
        return jsonify(user_data),200
    except requests.exceptions.HTTPError as http_err:
        if response.status_code == 404:
            return jsonify({"error" : "user nor found"}),404
        return jsonify({"error" : f"HTTP error occured {http_err}"}), response.status_code
    except requests.exceptions.RequestException as req_err:
        return jsonify({"error" : f"Request error occured {req_err}"}), 500 



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    