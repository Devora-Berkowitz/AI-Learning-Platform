import prisma from '../prismaClient.js';
import jwt from 'jsonwebtoken';
import { userSchema } from '../middleware/validationSchemas.js';

export const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { id, name, phone } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this ID already exists' });
    }

    const user = await prisma.user.create({
      data: { id, name, phone, role: 'user' },
    });

    res.status(201).json(user);
  } catch (err) {
    console.error('Failed to create user:', err);
    res.status(500).json({ error: 'Could not create user, please try again later' });
  }
};

export const loginUser = async (req, res) => {
  const { id } = req.body;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID is required and must be a string' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      console.error('Missing JWT secrets');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        created_at: user.created_at instanceof Date
          ? user.created_at.toISOString()
          : null,

      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed, please try again later' });
  }
};

export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Invalid refresh token:', err);
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.user.userId !== id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const prompts = await prisma.prompt.findMany({
      where: { userId: id },
      include: { user: true, category: true, subCategory: true },
      orderBy: { createdAt: 'desc' },
    });

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
    console.error('Failed to get user history:', err);
    res.status(500).json({ error: 'Could not get user history, please try again later' });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const users = await prisma.user.findMany({
      include: { prompts: { orderBy: { createdAt: 'desc' } } },
    });

    res.json(users);
  } catch (err) {
    console.error('Failed to get users:', err);
    res.status(500).json({ error: 'Could not get users, please try again later' });
  }
};
