import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getOpenAIResponse = async (prompt) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error from OpenAI:', error);
    return 'Failed to fetch response from OpenAI.';
  }
};
