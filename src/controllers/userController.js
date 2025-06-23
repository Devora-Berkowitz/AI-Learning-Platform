import prisma from '../prismaClient.js';

export const createUser = async (req, res) => {
<<<<<<< HEAD
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
=======
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const user = await prisma.user.create({ data: { name, phone } });
    res.json(user);
  } catch (error) {
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
    res.status(500).json({ error: error.message });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const { id } = req.params;
<<<<<<< HEAD

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
=======
    const history = await prisma.prompt.findMany({
      where: { userId: Number(id) }
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user history' });
  }
};
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb
