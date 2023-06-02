import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Get accessToken from when we logged in
  const authenticated = localStorage.getItem('accessToken');

  // If accessToken exists unlock children
  return authenticated ? (
    children
  ) : (
    // Else go to login
    <Navigate to="/" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;