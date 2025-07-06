#!/bin/bash

# Basic Prompt - cURL Examples
# This script demonstrates how to use the basic-prompt endpoint

BASE_URL="http://localhost:3000"
ENDPOINT="/gemini/basic-prompt"

echo "🚀 Testing Basic Prompt Endpoint"
echo "=================================="

# Example 1: Simple text prompt
echo "📝 Example 1: Simple text prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing in simple terms"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 2: Creative writing prompt
echo "✍️ Example 2: Creative writing prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a short story about a robot learning to paint"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 3: Code explanation prompt
echo "💻 Example 3: Code explanation prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain what this code does: function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 4: Error handling - Empty prompt
echo "❌ Example 4: Error handling - Empty prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": ""
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 5: Error handling - Missing prompt field
echo "❌ Example 5: Error handling - Missing prompt field"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "This should fail"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n✅ Basic Prompt Examples Complete!" 