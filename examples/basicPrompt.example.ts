
/**
 * Example calling the basic prompt endpoint.
 */
async function main(): Promise<void> {
  const response = await fetch('http://localhost:3000/api/gemini/basic-prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: 'Hello, Gemini!' }),
  });

  const text = await response.text();
  console.log(text);
}

main().catch((error) => {
  console.error(error);
});

