import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/ui/ThemeProvider'
import Login from './Pages/Login'
import HeroSection from './Pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import Courses from './Pages/student/Courses'
import MyLearning from './Pages/student/MyLearning'
import Profile from './Pages/student/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'
import Sidebar from "./Pages/admin/Sidebar.jsx"
import Dashboard from './Pages/admin/Dashboard'
import Course from './Pages/student/Course'
import CourseTable from './Pages/admin/course/CourseTable'
import AddCourse from './Pages/admin/course/AddCourse'
import EditCourse from './Pages/admin/course/EditCourse'

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
      // admin routes start from here
      {
        path:"admin",
        element:<Sidebar/>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          }
        ]
      }
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
  )
}

export default App