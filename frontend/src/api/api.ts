import axios from 'axios';
import { User, Prompt, Category, SubCategory } from '@/types/types';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Interceptor to add Authorization header with JWT if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learning_platform_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('[Axios] No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =================== Users ===================

export const createUser = async (
  id: string,
  name: string,
  phone: string
): Promise<User> => {
  const { data } = await API.post<User>('/users', { id, name, phone });
  return data;
};

import type { LoginResponse } from '../types/types';

export const loginUser = async (id: string): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>('/users/login', { id });
  return response.data;
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
  categoryId: string,
  subCategoryId: string,
  prompt: string
): Promise<Prompt> => {
  const { data } = await API.post<Prompt>('/prompt', {
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

