import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentsPage';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className='min-h-screen bg-gray-50 flex'>
        {user && <Sidebar />}
        <main className='flex-1 p-6'>
        {user && <Header title="Dashboard" />}
          <Routes>
            <Route path='/' element={user ? <Navigate to='/students' /> : <LoginPage />} />
            <Route path='/students' element={
              <ProtectedRoute>
                <StudentsPage />
              </ProtectedRoute>
            } />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
