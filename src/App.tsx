import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/components/login'; // Import the LoginPage component
import Dashboard from './features/dashboard/components/dashboard'; // Import the Dashboard component
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    );
};

export default App;
