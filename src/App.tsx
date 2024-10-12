import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/components/login'; // Import the LoginPage component
import Dashboard from './features/dashboard/components/dashboard'; // Import the Dashboard component
import Test from './features/test/components/test';
import QuestionForm from './features/test/components/question';
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/test" element={<Test/>} />
            <Route path="/question" element={<QuestionForm/>} />
        </Routes>
    );
};

export default App;
