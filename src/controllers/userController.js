import prisma from '../prismaClient.js';

export const createUser = async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const user = await prisma.user.create({ data: { name, phone } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await prisma.prompt.findMany({
      where: { userId: Number(id) }
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user history' });
  }
};
