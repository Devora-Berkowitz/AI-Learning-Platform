import prisma from '../prismaClient.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  const { id, name, phone } = req.body;

  if (!id || !name || !phone) {
    return res.status(400).json({ error: 'ID, Name, and Phone are required' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        id,
        name,
        phone,
        role: 'user',
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const loginUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Authenticated user:', req.user);

    if (req.user.userId !== id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const history = await prisma.prompt.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(history);
  } catch (error) {
    console.error('Failed to get user history', error);
    res.status(500).json({ error: 'Failed to get user history' });
  }
};

export const getUsers = async (req, res) => {
  try {
    console.log('User role:', req.user.role);
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const users = await prisma.user.findMany({
      include: {
        prompts: { orderBy: { createdAt: 'desc' } },
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};
