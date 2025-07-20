import express from 'express';
import { queryFromServer } from './personal_bot';

const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/ask', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided.' });
  }

  try {
    const answer = await queryFromServer(message);
    res.json({ response: answer });
  } catch (error) {
    console.error('Error in /ask route:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot.' });
  }
});

app.listen(PORT, () => {
  console.log(`Chatbot server running on http://localhost:${PORT}`);
});
