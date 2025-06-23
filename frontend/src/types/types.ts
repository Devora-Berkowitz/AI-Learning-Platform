export interface User {
  id: string;
  name: string;
  phone: string;
  idNumber: string;
  created_at: string;
  isAdmin?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

export interface Prompt {
  id: string;
  user_name;
  user_id: string;
  user_phone: string;
  category_id: string;
  sub_category_id: string;
  prompt: string;
  response: string;
  created_at: string;
  category_name?: string;
  sub_category_name?: string;
}

export interface LearningSession {
  category: Category;
  subCategory: SubCategory;
  prompt: string;
}
