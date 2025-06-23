<<<<<<< HEAD
import prisma from '../prismaClient.js';
=======
import prisma from '../prisma/client.js';
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
import { getOpenAIResponse } from '../services/openAiService.js';

export const createPrompt = async (req, res) => {
  try {
<<<<<<< HEAD
    console.log("REQ BODY:", req.body);
=======
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({ error: 'All fields are required: userId, categoryId, subCategoryId, prompt' });
    }

<<<<<<< HEAD
    // 🟡 תיקון המרה מ-string ל-int
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
=======
    const response = await getOpenAIResponse(prompt);

    const savedPrompt = await prisma.prompt.create({
      data: { userId, categoryId, subCategoryId, prompt, response }
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
    });

    res.json(savedPrompt);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error creating prompt:', error);
    res.status(500).json({ error: 'Failed to create prompt' });
  }
};

export const getAllPrompts = async (req, res) => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        user: true,
        category: true,
        subCategory: true,
      },
    });

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
=======
    res.status(500).json({ error: 'Failed to create prompt' });
  }
};
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
