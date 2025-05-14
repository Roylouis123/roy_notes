#!/usr/bin/env python3
"""
Test script for FastAPI application
This script makes requests to the FastAPI endpoints for testing
"""

import sys
import time
import json
from urllib.request import urlopen, Request
from urllib.error import URLError

BASE_URL = "http://localhost:8000"

def make_request(path, method="GET", data=None):
    """Make an HTTP request to the API"""
    url = f"{BASE_URL}{path}"
    
    headers = {"Content-Type": "application/json"} if data else {}
    
    if data:
        data = json.dumps(data).encode()
    
    req = Request(url, data=data, headers=headers, method=method)
    
    try:
        with urlopen(req) as response:
            return {
                "status": response.status,
                "data": json.loads(response.read().decode())
            }
    except URLError as e:
        return {
            "error": str(e),
            "status": getattr(e, "code", None)
        }

def test_endpoints():
    """Test various API endpoints"""
    tests = [
        # Test the root endpoint
        {
            "name": "Root endpoint",
            "path": "/",
            "method": "GET",
            "expected_status": 200
        },
        
        # Test getting all users
        {
            "name": "Get all users",
            "path": "/users",
            "method": "GET",
            "expected_status": 200
        },
        
        # Test getting a specific user
        {
            "name": "Get user by ID",
            "path": "/users/1",
            "method": "GET",
            "expected_status": 200
        },
        
        # Test getting all products
        {
            "name": "Get all products",
            "path": "/products",
            "method": "GET",
            "expected_status": 200
        },
        
        # Test searching
        {
            "name": "Search for products",
            "path": "/search?q=laptop",
            "method": "GET",
            "expected_status": 200
        }
    ]
    
    print("Testing FastAPI endpoints...")
    
    for test in tests:
        print(f"\nTesting: {test['name']}")
        response = make_request(test['path'], test['method'])
        
        if "error" in response:
            print(f"❌ Failed: {response['error']}")
            continue
            
        if response["status"] == test["expected_status"]:
            print(f"✅ Success (Status {response['status']})")
            # Print a sample of the data
            if isinstance(response["data"], dict):
                keys = list(response["data"].keys())[:3]
                print(f"Response keys: {keys}")
            elif isinstance(response["data"], list):
                print(f"Got {len(response['data'])} items")
        else:
            print(f"❌ Failed: Expected status {test['expected_status']}, got {response['status']}")

def main():
    """Main function to run the tests"""
    print("Waiting for FastAPI server to start...")
    max_retries = 5
    retries = 0
    
    # Wait for the server to be ready
    while retries < max_retries:
        try:
            with urlopen(f"{BASE_URL}/") as response:
                if response.status == 200:
                    print("Server is up and running!")
                    break
        except URLError:
            print(f"Server not ready yet, retrying in 2 seconds... ({retries+1}/{max_retries})")
            retries += 1
            time.sleep(2)
    
    if retries == max_retries:
        print("Could not connect to the server. Make sure it's running at", BASE_URL)
        sys.exit(1)
    
    # Run the tests
    test_endpoints()

if __name__ == "__main__":
    main()