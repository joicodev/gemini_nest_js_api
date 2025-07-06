#!/bin/bash

# Run All Examples Script
# This script runs all examples for the Orion Gemini API

BASE_URL="http://localhost:3000"

echo "�� Orion Gemini API - Complete Examples Suite"
echo "============================================="
echo ""

# Check if server is running
echo "�� Checking if server is running..."
if curl -s "${BASE_URL}/health" > /dev/null 2>&1; then
    echo "✅ Server is running at ${BASE_URL}"
else
    echo "❌ Server is not running at ${BASE_URL}"
    echo "Please start the server with: npm run start:dev"
    exit 1
fi

echo ""
echo "�� Available Examples:"
echo "1. Basic Prompt Examples"
echo "2. Awesome Prompt Examples" 
echo "3. Basic Prompt Stream Examples"
echo "4. All Examples"
echo ""

read -p "Select an option (1-4): " choice

case $choice in
    1)
        echo "Running Basic Prompt Examples..."
        bash examples/basic-prompt/curl-example.sh
        ;;
    2)
        echo "Running Awesome Prompt Examples..."
        bash examples/awesome-prompt/curl-example.sh
        ;;
    3)
        echo "Running Basic Prompt Stream Examples..."
        bash examples/basic-prompt-stream/curl-example.sh
        ;;
    4)
        echo "Running All Examples..."
        echo ""
        echo "=== BASIC PROMPT EXAMPLES ==="
        bash examples/basic-prompt/curl-example.sh
        echo ""
        echo "=== AWESOME PROMPT EXAMPLES ==="
        bash examples/awesome-prompt/curl-example.sh
        echo ""
        echo "=== BASIC PROMPT STREAM EXAMPLES ==="
        bash examples/basic-prompt-stream/curl-example.sh
        ;;
    *)
        echo "Invalid option. Please select 1-4."
        exit 1
        ;;
esac

echo ""
echo "✅ Examples completed!"
echo ""
echo "📚 Additional Resources:"
echo "- JavaScript examples: node examples/[endpoint]/javascript-example.js"
echo "- Postman collections: Import examples/[endpoint]/pos 