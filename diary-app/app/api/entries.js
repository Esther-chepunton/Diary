// api/entries.js
import { getEntries, saveEntries, findUserById } from '../../data';

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

  const entries = getEntries();

  if (req.method === 'GET') {
    const userEntries = entries.filter(entry => entry.userId === user.id);
    res.status(200).json(userEntries);
  } else if (req.method === 'POST') {
    const newEntry = { ...req.body, userId: user.id };
    entries.push(newEntry);
    saveEntries(entries);
    res.status(201).json(newEntry);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const index = entries.findIndex(entry => entry.id === parseInt(id) && entry.userId === user.id);
    if (index !== -1) {
      entries.splice(index, 1);
      saveEntries(entries);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  }
};
