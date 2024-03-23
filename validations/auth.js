import { body } from 'express-validator';

export const registerValidator = [
  body('email', 'Email is incorrect').isEmail(),
  body('password', 'Password must be min 5 symb').isLength({ min: 5 }),
  body('fullName', 'Type your name').isLength({ min: 3 }),
  body('avatarUrl', 'Wrong url').optional().isURL(),
];
