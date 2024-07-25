'use client';

import { useEffect, useState } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import cookies from 'js-cookie';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home'); // 'home', 'login', 'signup'

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      fetch('/api/entries', {
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Unauthorized') {
            setPage('login');
          } else {
            setEntries(data);
            setUser(true);
            setPage('home');
          }
        });
    } else {
      setPage('login');
    }
  }, []);

  const handleSaveEntry = entry => {
    const token = cookies.get('token');
    const updatedEntries = editingEntry
      ? entries.map(e => (e.id === entry.id ? entry : e))
      : [...entries, entry];

    fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    }).then(() => {
      setEntries(updatedEntries);
      setEditingEntry(null);
    });
  };

  const handleEditEntry = id => {
    const entry = entries.find(e => e.id === id);
    setEditingEntry(entry);
  };

  const handleDeleteEntry = id => {
    const token = cookies.get('token');
    const updatedEntries = entries.filter(e => e.id !== id);

    fetch(`/api/entries?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(() => setEntries(updatedEntries));
  };

  if (page === 'login') {
    return <LoginPage onLoginSuccess={() => setPage('home')} />;
  }

  if (page === 'signup') {
    return <SignupPage onSignupSuccess={() => setPage('login')} />;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 d-flex flex-column align-items-center">
          <div className="sticky-form">
            <h1 className="mb-4">Diary App</h1>
            <DiaryForm entry={editingEntry} onSave={handleSaveEntry} />
          </div>
          <div className="entries-list mt-4 w-100">
            <DiaryList
              entries={entries}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
