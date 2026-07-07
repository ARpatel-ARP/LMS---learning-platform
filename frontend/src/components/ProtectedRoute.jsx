
import { useLoadUserQuery } from "@/features/api/authApi";
import { useGetMyPurchasesQuery } from "@/features/api/paymentApi";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useLoadUserQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user.role !== "instructor") return <Navigate to="/" replace />;
  return children;
};
export const PurchasedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetMyPurchasesQuery();

  if (isLoading) return null;

  const hasPurchased = data?.purchases?.some(
    (p) => p.courseId?._id === courseId || p.courseId === courseId
  );

  if (!hasPurchased) {
    return <Navigate to={`/course-detail/${courseId}`} replace />;
  }

  return children;
};