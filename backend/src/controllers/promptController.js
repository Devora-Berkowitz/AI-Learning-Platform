import prisma from '../prismaClient.js';

import { getOpenAIResponse } from '../services/openAiService.js';

export const createPrompt = async (req, res) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({ error: 'All fields are required: userId, categoryId, subCategoryId, prompt' });
    }

    const parsedCategoryId = parseInt(categoryId, 10);
    const parsedSubCategoryId = parseInt(subCategoryId, 10);

    if (isNaN(parsedCategoryId) || isNaN(parsedSubCategoryId)) {
      return res.status(400).json({ error: 'categoryId and subCategoryId must be valid numbers' });
    }

    const response = await getOpenAIResponse(prompt);

    const savedPrompt = await prisma.prompt.create({
      data: {
        userId,
        categoryId: parsedCategoryId,
        subCategoryId: parsedSubCategoryId,
        prompt,
        response
      }
    });

    res.json(savedPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error);
    res.status(500).json({ error: 'Failed to create prompt' });
  }
};

export const getAllPrompts = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const userRole = req.user.role;

    let prompts;

    if (userRole === 'admin') {
      prompts = await prisma.prompt.findMany({
        include: { user: true, category: true, subCategory: true },
      });
    } else {
      prompts = await prisma.prompt.findMany({
        where: { userId: userId },
        include: { user: true, category: true, subCategory: true },
      });
    }

    const processedPrompts = prompts.map(p => ({
      id: p.id,
      user_id: p.userId,
      category_id: p.categoryId,
      sub_category_id: p.subCategoryId,
      prompt: p.prompt,
      response: p.response,
      created_at: p.createdAt,
      user_name: p.user.name,
      user_phone: p.user.phone,
      category_name: p.category.name,
      sub_category_name: p.subCategory.name,
    }));

    res.json(processedPrompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    res.status(500).json({ error: 'Failed to get all prompts' });
  }
};

