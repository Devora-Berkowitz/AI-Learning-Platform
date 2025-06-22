import prisma from '../prismaClient.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get categories' });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const subCategories = await prisma.subCategory.findMany({
      where: { categoryId: Number(id) }
    });
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subcategories' });
  }
};
