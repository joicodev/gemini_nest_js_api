/**
 * Example streaming the response from the basic prompt stream endpoint.
 */
async function main(): Promise<void> {
  const response = await fetch('http://localhost:3000/api/gemini/basic-prompt-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: 'Hello, Gemini!' }),
  });

  if (!response.body) {
    console.error('No stream returned');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log(decoder.decode(value));
  }
}

main().catch((error) => {
  console.error(error);
});

