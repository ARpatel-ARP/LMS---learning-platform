import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ProtectedRoute, AdminRoute, AuthenticatedUser, PurchasedRoute } from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./Pages/student/HeroSection";
import Courses from "./Pages/student/Courses";

const Login = lazy(() => import("./Pages/Login"));
const MyLearning = lazy(() => import("./Pages/student/MyLearning"));
const Profile = lazy(() => import("./Pages/student/Profile"));
const Course = lazy(() => import("./Pages/student/Course"));
const CourseDetail = lazy(() => import("./Pages/student/CourseDetail"));
const CourseProgress = lazy(() => import("./Pages/student/CourseProgress"));
const SearchPage = lazy(() => import("./Pages/student/SearchPage"));
const CheckoutPage = lazy(() => import("./components/checkout/CheckoutPage"));

const Sidebar = lazy(() => import("./Pages/admin/Sidebar.jsx"));
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const CourseTable = lazy(() => import("./Pages/admin/course/CourseTable"));
const AddCourse = lazy(() => import("./Pages/admin/course/AddCourse"));
const EditCourse = lazy(() => import("./Pages/admin/course/EditCourse"));
const CreateLecture = lazy(() => import("./Pages/admin/lectures/CreateLecture"));
const UpdateLecture = lazy(() => import("./Pages/admin/lectures/UpdateLecture"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin"></div>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "checkout/:courseId",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchasedRoute>
              <CourseProgress />
            </PurchasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "course", element: <CourseTable /> },
          { path: "course/create", element: <AddCourse /> },
          { path: "course/:courseId", element: <EditCourse /> },
          { path: "course/:courseId/lecture", element: <CreateLecture /> },
          { path: "course/:courseId/lecture/:lectureId", element: <UpdateLecture /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={appRouter} />
        </Suspense>
      </main>
    </ThemeProvider>
  );
}

export default App;