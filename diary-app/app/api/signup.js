import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getUsers, saveUsers } from '../../data';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

const usersFilePath = path.join(process.cwd(), 'users.json');

export async function POST(request) {
  const { username, email, password } = await request.json();

  const users = getUsers();

  if (users.some(user => user.email === email)) {
    return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  saveUsers(users);

  const token = Buffer.from(`${email}:${password}`).toString('base64');

  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  });

  return NextResponse.json({ message: 'Signup successful' }, { headers: { 'Set-Cookie': cookie } });
}
