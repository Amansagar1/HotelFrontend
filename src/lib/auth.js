// lib/auth.js
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12); // Hash with a salt of 12 rounds
  return hashedPassword;
};
