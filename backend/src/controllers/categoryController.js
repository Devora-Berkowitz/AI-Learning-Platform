import prisma from '../prismaClient.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Could not fetch categories, please try again later' });
  }
};

export const getSubCategories = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'Category ID is required' });

  try {
    const subCategories = await prisma.subCategory.findMany({
      where: { categoryId: Number(id) },
    });
    res.json(subCategories);
  } catch (err) {
    console.error('Error fetching subcategories:', err);
    res.status(500).json({ error: 'Could not fetch subcategories, please try again later' });
  }
};
