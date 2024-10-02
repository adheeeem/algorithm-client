import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/components/login'; // Import the LoginPage component

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    );
};

export default App;
