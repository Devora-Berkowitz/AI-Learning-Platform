<<<<<<< HEAD
import OpenAI from 'openai';
=======
import { Configuration, OpenAIApi } from 'openai';
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getOpenAIResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
=======
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getOpenAIResponse = async (prompt) => {
  try {
    const response = await openai.createChatCompletion({
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

<<<<<<< HEAD
    return response.choices[0].message.content;
=======
    return response.data.choices[0].message.content;
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
  } catch (error) {
    console.error('Error from OpenAI:', error);
    return 'Failed to fetch response from OpenAI.';
  }
};
