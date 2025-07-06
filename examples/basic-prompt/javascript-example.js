/**
 * Basic Prompt - JavaScript Examples
 * This file demonstrates how to use the basic-prompt endpoint with JavaScript/Node.js
 */

const BASE_URL = 'http://localhost:3000';
const ENDPOINT = 'api/gemini/basic-prompt';

/**
 * Make a request to the basic-prompt endpoint
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The AI response
 */
async function basicPrompt(prompt) {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}

/**
 * Example 1: Simple text prompt
 */
async function example1() {
  console.log('📝 Example 1: Simple text prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await basicPrompt('Explain quantum computing in simple terms');
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 2: Creative writing prompt
 */
async function example2() {
  console.log('\n✍️ Example 2: Creative writing prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await basicPrompt('Write a short story about a robot learning to paint');
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 3: Code explanation prompt
 */
async function example3() {
  console.log('\n💻 Example 3: Code explanation prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await basicPrompt(
      'Explain what this code does: function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }'
    );
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 4: Error handling - Empty prompt
 */
async function example4() {
  console.log('\n❌ Example 4: Error handling - Empty prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await basicPrompt('');
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 5: Error handling - Invalid JSON
 */
async function example5() {
  console.log('\n❌ Example 5: Error handling - Invalid JSON');
  console.log('='.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    });
    
    console.log('Status:', response.status);
    const errorText = await response.text();
    console.log('Error Response:', errorText);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Run all examples
 */
async function runAllExamples() {
  console.log('🚀 Testing Basic Prompt Endpoint');
  console.log('==================================\n');
  
  await example1();
  await example2();
  await example3();
  await example4();
  await example5();
  
  console.log('\n✅ Basic Prompt Examples Complete!');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples();
}

module.exports = {
  basicPrompt,
  example1,
  example2,
  example3,
  example4,
  example5,
  runAllExamples,
}; 