const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/get-ai-move', async (req, res) => {
  const gameState = req.body.gameState;
  const prompt = `Given the board state in a Connect Four game:(every row has a newline at the end of it)\n ${gameState}\n  In this representation, '+' indicates the player's moves, 'O' indicates the AI's moves, and '-' represents empty spaces. Analyze the board and determine the best move for the 'AI' player. Respond with just the column index (0-based) for the AI's next move. Respond with only the column index number. Don't write anything else.`;
  console.log(prompt);

  const fetchAIResponse = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": prompt}],
          temperature: 0.7,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      const data = await response.json();
      console.log("ai.js response: ", data.choices[0]);
      res.json(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching AI move:', error);
      setTimeout(fetchAIResponse, 5000); // Retry after 5 seconds
    }
  };

  fetchAIResponse();
});

module.exports = router;