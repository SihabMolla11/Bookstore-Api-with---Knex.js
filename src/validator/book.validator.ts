import Joi from 'joi';

const bookValidationType = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required',
  }),

  description: Joi.string().optional().messages({
    'string.base': 'Description must be a string',
  }),

  published_date: Joi.date().required().messages({
    'date.base': 'Published date must be a valid date',
    'any.required': 'Published date is required',
  }),

  author_id: Joi.number().integer().required().messages({
    'number.base': 'Author ID must be a number',
    'any.required': 'Author ID is required',
  }),
});

export default bookValidationType;
