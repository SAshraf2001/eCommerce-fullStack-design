import urllib.request
import urllib.parse
import json

url = "http://localhost:8000/api/auth/login/"
data = json.dumps({"username": "testuser", "password": "testpass123"}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print("Status:", response.status)
        print("Content:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error:", e.code)
    print("Content:", e.read().decode('utf-8'))
except Exception as e:
    print("Exception:", e)
