import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getOpenAIResponse = async (prompt) => {
  try {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: must be a non-empty string.');
    }

    const cleanedPrompt = prompt.trim().substring(0, 300);

    const safePrompt = cleanedPrompt.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, '');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: safePrompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error from OpenAI:', error);
    return 'Failed to fetch response from OpenAI.';
  }
};
