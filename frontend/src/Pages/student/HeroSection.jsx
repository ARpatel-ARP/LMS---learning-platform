import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = async (e) => {
   e.preventDefault()
   if (searchQuery.trim() !== "") {
     navigate(`/course/search?query=${searchQuery}`)
   }
   setSearchQuery("")
  }
  return (
    <div className='relative bg-gradient-to-r from-cyan-100 via-cyan-800 to-cyan-100 dark:from-black dark:via-cyan-950 dark:to-black py-15 px-4 text-center'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-white md:text-3xl text-2xl font-bold mt-10'>Find the Best Courses For You</h1>
        <p className='text-gray-200 md:text-lg text-sm dark:text-gray-400 mt-5'>Discover, Learn, and Upskill with our wide range of courses</p>
        <form onSubmit={searchHandler} className='flex items-center border-none pl-5 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto md:mb-6 mt-5 bg-white'>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="flex-1 bg-transparent text-black placeholder-gray-400 outline-none focus:outline-none border-none px-2 text-sm"
          />
          <Button type="submit" className="bg-gray-900 h-12 text-white rounded-r-full hover:bg-gray-700 px-6">
            Search
          </Button>
        </form>
        <Button className="rounded-full p-3 py-5 mt-3 bg-white text-black hover:bg-gray-900 hover:text-white">Explore Courses</Button>
      </div>
      </div>

      
  );
}

export default HeroSection;
