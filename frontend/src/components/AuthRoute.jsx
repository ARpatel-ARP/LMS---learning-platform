import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  
  if (user) {
    return <Navigate to="/" replace />  // ← if already logged in, go to home
  }
  return children
}

export default AuthRoute