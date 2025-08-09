import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) navigate('/students');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Enter email and password');
      return;
    }
    setSubmitting(true);
    try {
      await loginWithEmail(email.trim(), password);
      toast.success('Logged in');
      navigate('/students');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-32'>
      <ToastContainer position='top-right' autoClose={2500} />
      <form className='bg-white p-6 rounded shadow' onSubmit={handleSubmit}>
        <h2 className='text-2xl mb-4'>Sign in</h2>
        <label className='block mb-2 text-sm'>Email</label>
        <input className='w-full mb-3 p-2 border rounded' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        <label className='block mb-2 text-sm'>Password</label>
        <input className='w-full mb-4 p-2 border rounded' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button className='w-full bg-blue-600 text-white py-2 rounded' disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}
