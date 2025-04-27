import Joi from 'joi';

const authorValidationType = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  password: Joi.string().email().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  bio: Joi.string().optional().messages({
    'string.base': 'Bio must be a string',
  }),
  birthdate: Joi.date().required().messages({
    'date.base': 'Birthdate must be a valid date',
    'any.required': 'Birthdate is required',
  }),
});

export default authorValidationType;
