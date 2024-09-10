import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute=({ children,requiredRole  }) => {
    const role = localStorage.getItem('role');

    if (role === requiredRole) {
        return children;
    }

  
    return <Navigate to="/login" />;
};

const AdminRoute = () => {
    return (
        <ProtectedRoute requiredRole="ADMIN">
            <h1>Admin Sayfası</h1>
            <Navigate to="/customers" />
        </ProtectedRoute>
    );
};
export default AdminRoute;
