import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const filePath = path.join(process.cwd(), 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);

    const user = users.find(user => user.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = Buffer.from(`${user.email}:${password}`).toString('base64');

      const cookie = serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });

      res.setHeader('Set-Cookie', cookie);
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}