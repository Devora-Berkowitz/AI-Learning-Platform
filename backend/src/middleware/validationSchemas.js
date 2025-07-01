import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string().required(),    
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

export const promptSchema = Joi.object({
  categoryId: Joi.number().required(),
  subCategoryId: Joi.number().required(),
  prompt: Joi.string().max(500).required(),
});
