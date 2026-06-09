
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const {isAuthenticated } = useSelector((state) => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
export const AuthenticatedUser =  ({ children }) => {
  const {isAuthenticated } = useSelector((state) => state.auth)
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

export const AdminRoute =  ({ children }) => {
  const {user, isAuthenticated } = useSelector((state) => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (user.role !== "instructor") {
    return <Navigate to="/" replace />
    
  }
  return children
}