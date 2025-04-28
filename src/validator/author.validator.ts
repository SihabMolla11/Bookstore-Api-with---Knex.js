import Joi from 'joi';

export const registrationDTO = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email must be a string',
    'string.empty': 'email cannot be empty',
    'any.required': 'email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  bio: Joi.string().optional().messages({
    'string.base': 'Bio must be a string',
  }),
  birthdate: Joi.date().required().messages({
    'date.base': 'Birth date must be a valid date',
    'any.required': 'Birth date is required',
  }),
});

export const loginUserDTO = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'email must be a string',
    'string.empty': 'email cannot be empty',
    'any.required': 'email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
});

export const createAuthorDTO = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  bio: Joi.string().optional().messages({
    'string.base': 'Bio must be a string',
  }),
  birthdate: Joi.date().required().messages({
    'date.base': 'Birth date must be a valid date',
    'any.required': 'Birth date is required',
  }),
});

export const updateAuthorDTO = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name must be a string',
  }),
  bio: Joi.string().optional().messages({
    'string.base': 'Bio must be a string',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Bio must be a string',
  }),
  birthdate: Joi.date().optional().messages({
    'date.base': 'Birth date must be a valid date',
  }),
});
