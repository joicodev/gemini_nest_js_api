#!/bin/bash

# Basic Prompt Stream - cURL Examples
# This script demonstrates how to use the basic-prompt-stream endpoint with file uploads

BASE_URL="http://localhost:3000"
ENDPOINT="/gemini/basic-prompt-stream"

echo "🚀 Testing Basic Prompt Stream Endpoint"
echo "======================================="

# Create a temporary text file for testing
echo "This is a test file content for AI analysis." > /tmp/test_file.txt
echo "It contains some sample text that can be processed by the AI." >> /tmp/test_file.txt

# Example 1: Stream with text file
echo "📄 Example 1: Stream with text file"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -F "prompt=Analyze this text file and summarize its content" \
  -F "files=@/tmp/test_file.txt" \
  -H "Accept: text/plain" \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 2: Stream with multiple files
echo "📁 Example 2: Stream with multiple files"
echo "File 2 content for testing." > /tmp/test_file2.txt
echo "Another sample text for analysis." >> /tmp/test_file2.txt

curl -X POST "${BASE_URL}${ENDPOINT}" \
  -F "prompt=Compare and analyze these two text files" \
  -F "files=@/tmp/test_file.txt" \
  -F "files=@/tmp/test_file2.txt" \
  -H "Accept: text/plain" \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 3: Stream without files (text only)
echo "💬 Example 3: Stream without files (text only)"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -F "prompt=Write a detailed explanation of machine learning algorithms" \
  -H "Accept: text/plain" \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 4: Stream with image file (if available)
echo "��️ Example 4: Stream with image file"
if [ -f "/tmp/test_image.jpg" ]; then
  curl -X POST "${BASE_URL}${ENDPOINT}" \
    -F "prompt=Describe what you see in this image" \
    -F "files=@/tmp/test_image.jpg" \
    -H "Accept: text/plain" \
    -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"
else
  echo "No test image found. Create /tmp/test_image.jpg to test image upload."
fi

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 5: Error handling - Empty prompt
echo "❌ Example 5: Error handling - Empty prompt"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -F "prompt=" \
  -F "files=@/tmp/test_file.txt" \
  -H "Accept: text/plain" \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

echo -e "\n" && echo "="*50 && echo -e "\n"

# Example 6: Error handling - Non-existent file
echo "❌ Example 6: Error handling - Non-existent file"
curl -X POST "${BASE_URL}${ENDPOINT}" \
  -F "prompt=Analyze this file" \
  -F "files=@/tmp/non_existent_file.txt" \
  -H "Accept: text/plain" \
  -w "\n\nStatus: %{http_code}\nTime: %{time_total}s\n"

# Clean up temporary files
rm -f /tmp/test_file.txt /tmp/test_file2.txt

echo -e "\n✅ Basic Prompt Stream Examples Complete!" 