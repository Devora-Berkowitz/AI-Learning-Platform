import axios from 'axios';
import { User, Prompt, Category, SubCategory } from '@/types/types';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor to add Authorization header with JWT if it exists

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('learning_platform_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[Axios] Authorization header added:', config.headers.Authorization);
  } else {
    console.warn('[Axios] No token found in localStorage');
  }
  return config;
});

// =================== Types ===================

type LoginResponse = {
  user: User;
  token: string;
};

// =================== Users ===================

export const createUser = async (
  id: string,
  name: string,
  phone: string
): Promise<User> => {
  const { data } = await API.post<User>('/users', { id, name, phone });
  return data;
};

export const loginUser = async (id: string): Promise<LoginResponse> => {
  const { data } = await API.post<LoginResponse>('/users/login', { id });
  return data;
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await API.get<User[]>('/users');
  return data;
};

export const getUserHistory = async (userId: string): Promise<Prompt[]> => {
  const { data } = await API.get<Prompt[]>(`/users/${userId}/history`);
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
  const { data } = await API.get<SubCategory[]>(
    `/categories/${categoryId}/subcategories`
  );
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

