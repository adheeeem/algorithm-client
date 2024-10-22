import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/lib/auth';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    if (localStorage.getItem('accessToken') === null) {
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="btn btn-sm btn-outline btn-error"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          className="btn btn-primary"
          onClick={() => handleNavigation('/admin-new-student')}
        >
          Register Student
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleNavigation('/question')}
        >
          Create Question
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleNavigation('/test')}
        >
          List of Questions
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
