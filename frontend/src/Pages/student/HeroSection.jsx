import { Button } from '@/components/ui/button';
import React from 'react';

const HeroSection = () => {
  return (
    <div className='relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900 py-15 px-4 text-center'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-white md:text-3xl text-2xl font-bold mt-10'>Find the Best Courses For You</h1>
        <p className='text-gray-200 md:text-lg text-sm dark:text-gray-400 mt-5'>Discover, Learn, and Upskill with our wide range of courses</p>
        <form className='flex items-center border-none pl-5 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto md:mb-6 mt-5 bg-white'>
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 bg-transparent text-black placeholder-gray-400 outline-none focus:outline-none border-none px-2 text-sm"
          />
          <Button className="bg-gray-900 h-12 text-white rounded-r-full hover:bg-gray-700 px-6">
            Search
          </Button>
        </form>
        <Button className="rounded-full p-3 py-5 mt-3 bg-white text-black hover:bg-gray-900 hover:text-white">Explore Courses</Button>
      </div>

      {/* Luminous bottom border */}
     <div className="absolute bottom-0 left-0 w-full h-px bg-purple-500 dark:bg-gray-400 shadow-[0_0_15px_4px_rgba(168,85,247,0.7)] dark:shadow-[0_0_15px_4px_rgba(156,163,175,0.4)]" />
     </div>
  );
}
export default HeroSection;
