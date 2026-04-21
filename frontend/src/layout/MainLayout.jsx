import Navbar from '@/components/Navbar';
import Login from '@/Pages/Login';
import HeroSection from '@/Pages/student/HeroSection';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default MainLayout;
