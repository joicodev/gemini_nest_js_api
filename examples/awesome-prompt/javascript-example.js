/**
 * Awesome Prompt - JavaScript Examples
 * This file demonstrates how to use the awesome-prompt endpoint with JavaScript/Node.js
 */

const BASE_URL = 'http://localhost:3000';
const ENDPOINT = '/api/gemini/awesome-prompt';

/**
 * Make a request to the awesome-prompt endpoint
 * @param {string} prompt - The prompt to improve
 * @returns {Promise<string>} - The improved prompt
 */
async function awesomePrompt(prompt) {
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
 * Example 1: Improve a simple prompt
 */
async function example1() {
  console.log('✨ Example 1: Improve a simple prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await awesomePrompt('Tell me about AI');
    console.log('Original: Tell me about AI');
    console.log('Improved:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 2: Improve a vague prompt
 */
async function example2() {
  console.log('\n✍️ Example 2: Improve a vague prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await awesomePrompt('Write something about technology');
    console.log('Original: Write something about technology');
    console.log('Improved:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 3: Improve a technical prompt
 */
async function example3() {
  console.log('\n💻 Example 3: Improve a technical prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await awesomePrompt('How to make a website');
    console.log('Original: How to make a website');
    console.log('Improved:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 4: Improve a creative prompt
 */
async function example4() {
  console.log('\n✍️ Example 4: Improve a creative prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await awesomePrompt('Write a story');
    console.log('Original: Write a story');
    console.log('Improved:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 5: Improve a business prompt
 */
async function example5() {
  console.log('\n🎯 Example 5: Improve a business prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await awesomePrompt('Marketing strategy');
    console.log('Original: Marketing strategy');
    console.log('Improved:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 6: Error handling - Empty prompt
 */
async function example6() {
  console.log('\n❌ Example 6: Error handling - Empty prompt');
  console.log('='.repeat(50));
  
  try {
    const response = await awesomePrompt('');
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Run all examples
 */
async function runAllExamples() {
  console.log('🚀 Testing Awesome Prompt Endpoint');
  console.log('===================================\n');
  
  await example1();
  await example2();
  await example3();
  await example4();
  await example5();
  await example6();
  
  console.log('\n✅ Awesome Prompt Examples Complete!');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples();
}

module.exports = {
  awesomePrompt,
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
  runAllExamples,
}; 