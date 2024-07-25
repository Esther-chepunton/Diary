import { NextResponse } from 'next/server';
import users from '../../users.json'; // Ensure you have a users.json file in the root

export async function GET(request) {
  const email = new URL(request.url).searchParams.get('email');
  
  const userExists = users.some(user => user.email === email);

  return NextResponse.json({ exists: userExists });
}
