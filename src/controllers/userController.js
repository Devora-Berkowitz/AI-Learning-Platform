import prisma from '../prismaClient.js';

export const createUser = async (req, res) => {
  const { id, name, phone } = req.body; 

  if (!id || !name || !phone) {
    return res.status(400).json({ error: 'ID, Name and Phone are required' });
  }

  try {
    const user = await prisma.user.create({
      data: { id, name, phone },
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await prisma.prompt.findMany({
      where: { userId: id },  
      orderBy: { createdAt: 'desc' },
    });

    res.json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);  // כדאי להוסיף לוג
    res.status(500).json({ error: 'Failed to get user history' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        prompts: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};
