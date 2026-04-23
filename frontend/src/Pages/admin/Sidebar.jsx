import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex'>
      <div className='hidden lg:block w-62.5 sm:w-75 space-y-8 border-r-gray-300 dark:border-r-zinc-800 border bg-[#f0f0f0] dark:bg-zinc-950  p-5 h-screen' >
        <div className="space-y-4 mt-10 p-2 pt-10">
            <Link to="/admin/dashboard" className='flex items-center gap-2'>
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
            </Link>
           <Link to="/admin/courses" className='flex items-center gap-2'>
            <SquareLibrary size={22}/>
            <h1>Courses</h1>
           </Link>
        </div>
    </div>
        <div>
          <Outlet/>
        </div>
    </div>
  )
}

export default Sidebar