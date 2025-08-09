import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className='text-center py-10'>Loading...</div>;
  if (!user) return <Navigate to='/' replace />;
  return children;
};

export default ProtectedRoute;
