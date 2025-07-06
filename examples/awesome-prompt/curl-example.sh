#!/bin/bash

# Awesome Prompt - cURL Examples
# This script demonstrates how to use the awesome-prompt endpoint

BASE_URL="http://localhost:3000"
ENDPOINT="/gemini/awesome-prompt"

echo "🚀 Testing Awesome Prompt Endpoint"
echo "==================================="

# Example 1: Improve a simple prompt
echo "✨ Example 1: Improve a simple prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Tell me about AI"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 2: Improve a vague prompt
echo "✍️ Example 2: Improve a vague prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write something about technology"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 3: Improve a technical prompt
echo "💻 Example 3: Improve a technical prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "How to make a website"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 4: Improve a creative prompt
echo "✍️ Example 4: Improve a creative prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a story"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 5: Improve a business prompt
echo "🎯 Example 5: Improve a business prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Marketing strategy"
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 6: Error handling - Empty prompt
echo "❌ Example 6: Error handling - Empty prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": ""
  }' \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n✅ Awesome Prompt Examples Complete!" 