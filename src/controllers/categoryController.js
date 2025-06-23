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
<<<<<<< HEAD
      where: { categoryId: Number(id) },
    });

=======
      where: { categoryId: Number(id) }
    });
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subcategories' });
  }
};
