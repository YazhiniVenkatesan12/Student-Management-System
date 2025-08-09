import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
      alert('Logout failed');
    }
  };

  return (
    <aside className='w-64 bg-slate-900 text-white flex flex-col p-4'>
      <div className='text-2xl font-bold mb-6'>StudentMgmt</div>
      <nav className='flex-1'>
        <button className='w-full text-left py-2 px-3 rounded hover:bg-slate-800' onClick={() => navigate('/students')}>Students</button>
      </nav>
      <div className='mt-4 flex items-center justify-between'>
        <div className='text-sm'>{user?.email}</div>
        <button className='bg-red-600 px-3 py-1 rounded' onClick={handleLogout}>Sign out</button>
      </div>
    </aside>
  );
}
