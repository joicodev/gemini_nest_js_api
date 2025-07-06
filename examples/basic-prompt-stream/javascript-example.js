/**
 * Basic Prompt Stream - JavaScript Examples
 * This file demonstrates how to use the basic-prompt-stream endpoint with JavaScript/Node.js
 */

const BASE_URL = 'http://localhost:3000';
const ENDPOINT = '/gemini/basic-prompt-stream';
const fs = require('fs');
const FormData = require('form-data');

/**
 * Make a streaming request to the basic-prompt-stream endpoint
 * @param {string} prompt - The prompt to send
 * @param {Array} files - Array of file paths to upload
 * @returns {Promise<string>} - The streaming response
 */
async function basicPromptStream(prompt, files = []) {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    
    // Add files to form data
    for (const filePath of files) {
      if (fs.existsSync(filePath)) {
        formData.append('files', fs.createReadStream(filePath));
      }
    }

    const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      result += chunk;
      process.stdout.write(chunk); // Print chunks as they arrive
    }

    return result;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
}

/**
 * Create a temporary test file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @returns {string} - File path
 */
function createTestFile(content, filename) {
  const filePath = `/tmp/${filename}`;
  fs.writeFileSync(filePath, content);
  return filePath;
}

/**
 * Example 1: Stream with text file
 */
async function example1() {
  console.log('📄 Example 1: Stream with text file');
  console.log('='.repeat(50));
  
  try {
    const testFile = createTestFile(
      'This is a test file content for AI analysis.\nIt contains some sample text that can be processed by the AI.',
      'test_file.txt'
    );
    
    console.log('Sending request with file...\n');
    await basicPromptStream('Analyze this text file and summarize its content', [testFile]);
    
    // Clean up
    fs.unlinkSync(testFile);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 2: Stream with multiple files
 */
async function example2() {
  console.log('\n📁 Example 2: Stream with multiple files');
  console.log('='.repeat(50));
  
  try {
    const testFile1 = createTestFile(
      'File 1 content for testing.\nThis is the first file.',
      'test_file1.txt'
    );
    
    const testFile2 = createTestFile(
      'File 2 content for testing.\nThis is the second file.',
      'test_file2.txt'
    );
    
    console.log('Sending request with multiple files...\n');
    await basicPromptStream('Compare and analyze these two text files', [testFile1, testFile2]);
    
    // Clean up
    fs.unlinkSync(testFile1);
    fs.unlinkSync(testFile2);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 3: Stream without files (text only)
 */
async function example3() {
  console.log('\n💬 Example 3: Stream without files (text only)');
  console.log('='.repeat(50));
  
  try {
    console.log('Sending text-only request...\n');
    await basicPromptStream('Write a detailed explanation of machine learning algorithms');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 4: Stream with large text
 */
async function example4() {
  console.log('\n📝 Example 4: Stream with large text');
  console.log('='.repeat(50));
  
  try {
    const largeContent = 'This is a large text file. '.repeat(100);
    const testFile = createTestFile(largeContent, 'large_file.txt');
    
    console.log('Sending request with large file...\n');
    await basicPromptStream('Summarize this large text file', [testFile]);
    
    // Clean up
    fs.unlinkSync(testFile);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 5: Error handling - Empty prompt
 */
async function example5() {
  console.log('\n❌ Example 5: Error handling - Empty prompt');
  console.log('='.repeat(50));
  
  try {
    const testFile = createTestFile('Test content', 'test_file.txt');
    await basicPromptStream('', [testFile]);
    fs.unlinkSync(testFile);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Example 6: Error handling - Non-existent file
 */
async function example6() {
  console.log('\n❌ Example 6: Error handling - Non-existent file');
  console.log('='.repeat(50));
  
  try {
    await basicPromptStream('Analyze this file', ['/tmp/non_existent_file.txt']);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * Run all examples
 */
async function runAllExamples() {
  console.log('🚀 Testing Basic Prompt Stream Endpoint');
  console.log('=======================================\n');
  
  await example1();
  await example2();
  await example3();
  await example4();
  await example5();
  await example6();
  
  console.log('\n✅ Basic Prompt Stream Examples Complete!');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples();
}

module.exports = {
  basicPromptStream,
  createTestFile,
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
  runAllExamples,
}; 