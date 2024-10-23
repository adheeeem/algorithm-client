import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/components/login"; // Import the LoginPage component
import Dashboard from "./features/dashboard/components/dashboard"; // Import the Dashboard component
import Test from "./features/test/components/test";
import QuestionForm from "./features/test/components/question";
import { QueryClientProvider, QueryClient } from "react-query";
import AdminDashboard from "./features/dashboard/components/admin-dashboard";
import NotFound from "./app/not-found";
import AdminNewStudent from "./features/dashboard/components/admin-new-student";
import { ProtectedRoute } from "./lib/auth";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={[1, 2, 3, 4]}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/test" element={
            <ProtectedRoute roles={[1, 2, 3]}>
              <Test />
            </ProtectedRoute>
          } />
          <Route path="/question" element={<QuestionForm />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute roles={[1, 2, 3]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-new-student" element={
            <ProtectedRoute roles={[1, 2]}>
              <AdminNewStudent />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
