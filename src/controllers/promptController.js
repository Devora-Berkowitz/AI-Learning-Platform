import prisma from '../prisma/client.js';
import { getOpenAIResponse } from '../services/openAiService.js';

export const createPrompt = async (req, res) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({ error: 'All fields are required: userId, categoryId, subCategoryId, prompt' });
    }

    const response = await getOpenAIResponse(prompt);

    const savedPrompt = await prisma.prompt.create({
      data: { userId, categoryId, subCategoryId, prompt, response }
    });

    res.json(savedPrompt);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create prompt' });
  }
};
