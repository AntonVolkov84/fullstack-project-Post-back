import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Email is incorrect').isEmail(),
  body('password', 'Password must be min 5 symb').isLength({ min: 5 }),
  body('fullName', 'Type your name').isLength({ min: 3 }),
  body('avatarUrl', 'Wrong url').optional().isURL(),
];
export const loginValidator = [
  body('email', 'Email is incorrect').isEmail(),
  body('password', 'Password must be min 5 symb').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body('title', 'Type a title of post').isLength({ min: 3 }).isString(),
  body('text', 'Type text of post').isLength({ min: 3 }).isString(),
  body('tags', 'Incorrect type of tegs').optional().isString(),
  body('imageUrl', 'Wrong url').optional().isString(),
];
