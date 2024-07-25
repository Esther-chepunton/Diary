import { NextResponse } from 'next/server';
import { getUsers } from '../../data';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export async function POST(request) {
  const { username, password } = await request.json();

  const users = getUsers();
  const user = users.find(user => user.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = Buffer.from(`${user.email}:${password}`).toString('base64');

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return NextResponse.json({ message: 'Login successful' }, { headers: { 'Set-Cookie': cookie } });
  } else {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }
}
