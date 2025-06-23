import axios from 'axios';
import { User, Prompt, Category, SubCategory } from '@/types/types';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// =================== Users ===================
export const getUsers = async (): Promise<User[]> => {
  const { data } = await API.get<User[]>('/users');
  return data;
};

export const getUserHistory = async (userId: string): Promise<Prompt[]> => {
  const { data } = await API.get<Prompt[]>(`/users/${userId}/history`);
  return data;
};

export const createUser = async (id: string, name: string, phone: string): Promise<User> => {
  const { data } = await API.post<User>('/users', { id, name, phone });
  return data;
};

// =================== Categories ===================
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await API.get<Category[]>('/categories');
  return data;
};

export const getSubCategories = async (
  categoryId: string
): Promise<SubCategory[]> => {
  const { data } = await API.get<SubCategory[]>(`/categories/${categoryId}/subcategories`);
  return data;
};

// =================== Prompt ===================
export const sendPrompt = async (
  userId: string,
  categoryId: string,
  subCategoryId: string,
  prompt: string
): Promise<Prompt> => {
  const { data } = await API.post<Prompt>('/prompt', {
    userId,
    categoryId,
    subCategoryId,
    prompt,
  });
  return data;
};

export const getAllPrompts = async (): Promise<Prompt[]> => {
  const { data } = await API.get<Prompt[]>('/prompt/prompts');
  return data;
};

