import prisma from '../prismaClient.js';
import { getOpenAIResponse } from '../services/openAiService.js';
import { promptSchema } from '../middleware/validationSchemas.js';

export const createPrompt = async (req, res) => {
  const { error } = promptSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const response = await getOpenAIResponse(req.body.prompt);

    const savedPrompt = await prisma.prompt.create({
      data: {
        prompt: req.body.prompt,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        userId: req.user.userId,
        response
      }
    });

    res.status(201).json(savedPrompt);
  } catch (err) {
    console.error('Error creating prompt:', err);
    res.status(500).json({ error: 'Could not create prompt, please try again later' });
  }
};

export const getAllPrompts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;

    let prompts;
    if (userRole === 'admin') {
      prompts = await prisma.prompt.findMany({
        include: { user: true, category: true, subCategory: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      prompts = await prisma.prompt.findMany({
        where: { userId },
        include: { user: true, category: true, subCategory: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    const processed = prompts.map(p => ({
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

    res.json(processed);
  } catch (err) {
    console.error('Error fetching prompts:', err);
    res.status(500).json({ error: 'Could not fetch prompts, please try again later' });
  }
};
