export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Translate this natural language query into SQL:\n\n"${req.body}"\n\nSQL Query:`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      temperature: 0.5,
      max_tokens: 2048,
      n: 1,
      stop: '\n',
      model: 'text-davinci-003',
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      logprobs: 10,
    }),
  });

  const data = await response.json();

  res.status(200).json({ sql: data.choices[0].text.trim() });
}
