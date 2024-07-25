// api/session.js
import { getUsers } from '../../data';

export default async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decodedToken = Buffer.from(token, 'base64').toString('ascii');
  const [email, password] = decodedToken.split(':');

  const users = getUsers();
  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password));
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ user });
};
