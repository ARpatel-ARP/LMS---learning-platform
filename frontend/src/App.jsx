import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import Login from "./Pages/Login";
import HeroSection from "./Pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./Pages/student/Courses";
import MyLearning from "./Pages/student/MyLearning";
import Profile from "./Pages/student/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Sidebar from "./Pages/admin/Sidebar.jsx";
import Dashboard from "./Pages/admin/Dashboard";
import Course from "./Pages/student/Course";
import CourseTable from "./Pages/admin/course/CourseTable";
import AddCourse from "./Pages/admin/course/AddCourse";
import EditCourse from "./Pages/admin/course/EditCourse";
import CreateLecture from "./Pages/admin/lectures/CreateLecture";
import UpdateLecture from "./Pages/admin/lectures/UpdateLecture";
import CourseDetail from "./Pages/student/CourseDetail";
import CheckoutPage from "./components/checkout/CheckoutPage";
import CourseProgress from "./Pages/student/CourseProgress";
import SearchPage from "./Pages/student/SearchPage";

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
          <AuthRoute>
            <Login />
          </AuthRoute>
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
            <CourseProgress />
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <UpdateLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </ThemeProvider>
  );
}

export default App;
