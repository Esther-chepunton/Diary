import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

const usersFilePath = path.join(process.cwd(), 'users.json');

export async function POST(request) {
  const { username, email, password } = await request.json();

  // Read users from the file
  const fileContents = fs.readFileSync(usersFilePath, 'utf8');
  const users = JSON.parse(fileContents);

  // Check if the user already exists
  if (users.some(user => user.username === username || user.email === email)) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  // Hash the password and create a new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  // Save the updated users list to the file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  // Generate a token and set it as a cookie
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  });

  return NextResponse.json({ message: 'Signup successful' }, { headers: { 'Set-Cookie': cookie } });
}