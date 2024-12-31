from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) # enables CORS for all routes 
GITHUB_API_URL = "https://api.github.com"


@app.route('/api/health', methods=["GET"])
def health_check():
    return jsonify({"status" : "healthy"}), 200

@app.route('/api/profile', methods=["GET"])
def get_github_profile():
    # get the username from query Params
    username = request.args.get('username')
    if not username:
        return jsonify({"status":"error", "message":"Username is required"}),400
    try:
        #Fetch user data from Github API
        response = requests.get(f"{GITHUB_API_URL}/users/{username}")
        response.raise_for_status()
        user_data = response.json()
        return jsonify({"status":"success", "data" : user_data}),200
    except requests.exceptions.HTTPError as http_err:
        if response.status_code == 404:
            return jsonify({"status":"error", "message" : "User not found"}),404
        elif response.status_code == 403:
            return jsonify({"status" : "error", "message" : "Rate limit excedeed, please try again later"}), 403
        return jsonify({"status" : "error", "message" : f"HTTP error occured {http_err}"}), response.status_code
    except requests.exceptions.RequestException as req_err:
        return jsonify({"status" : "error", "message" : f"Request error occured {req_err}"}), 500 


@app.route('/api/repositories', methods = ["GET"])
def get_github_repositories():
    # get username from query params
    username = request.args.get('username')
    if not username:
        return jsonify({"status" : "error", "message" : "Username is required" }), 400
    try:
        # fetch user repositories from GITHUB API
        response = requests.get(f"{GITHUB_API_URL}/users/{username}/repos")
        response.raise_for_status()
        repos = response.json()
        # extract useful data for repositories
        repositories_data = []
        for repo in repos :
            repositories_data.append({
                "name" : repo['name'],
                "html_url" : repo['html_url'],
                "description" : repo['description'],
                "language" : repo['language'],
                "stargazers_count" : repo['stargazers_count'],
                "forks_count": repo['forks_count']
            })
        return jsonify({"status" : "success", "data" : repositories_data}), 200
    
    except requests.exceptions.HTTPError as http_err:
        if response.status_code == 404:
            return jsonify({"status" : "error", "message": "Username not found"}), 404
        elif response.status_code == 403:
            return jsonify({"status" : "error", "message": "Rate limit exceeded, please try again later"}), 403
        return jsonify({"status": "error", "message": f"HTTP error occurred: {http_err}"}), response.status_code
    except requests.exceptions.RequestException as req_err:
        return jsonify({"status": "error", "message": f"Request error occurred: {req_err}"}), 500
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    