import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
   <div className='flex'>
  <div className='hidden lg:block shrink-0 border-r border-gray-300 dark:border-zinc-800 bg-[#f0f0f0] dark:bg-zinc-950 p-3 pr-15 h-screen'>
    <div className="space-y-4 mt-10 p-2 pt-10">
      <Link to="dashboard" className='flex items-center gap-2 whitespace-nowrap'>
        <ChartNoAxesColumn size={22} />
        <h1>Dashboard</h1>
      </Link>
      <Link to="course" className='flex items-center gap-2 whitespace-nowrap'>
        <SquareLibrary size={22} />
        <h1>Courses</h1>
      </Link>
    </div>
  </div>
  <div className='flex-1 md:py-20 md:px-6 p-2 bg-white dark:bg-zinc-950'>
    <Outlet />
  </div>
</div>
  )
}

export default Sidebar