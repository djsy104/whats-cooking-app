import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, 10);
};

export const comparePasswords = (inputPassword, storedHash) => {
  return bcrypt.compare(inputPassword, storedHash);
};
