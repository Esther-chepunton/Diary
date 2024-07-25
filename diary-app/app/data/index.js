import fs from 'fs';
import bcrypt from 'bcryptjs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const entriesFilePath = path.join(process.cwd(), 'data', 'entries.json');

// Read JSON file
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Write JSON file
const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get all users
export const getUsers = () => readJsonFile(usersFilePath);

// Get all entries
export const getEntries = () => readJsonFile(entriesFilePath);

// Save users
export const saveUsers = (users) => writeJsonFile(usersFilePath, users);

// Save entries
export const saveEntries = (entries) => writeJsonFile(entriesFilePath, entries);

// Find user by email
export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Validate user password
export const validateUserPassword = async (email, password) => {
  const user = findUserByEmail(email);
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }
  return null;
};
