import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';
import CourseTab from './CourseTab';

const EditCourse = () => {
  return (
    <div className='flex-1'>
    <div className='flex items-center justify-between mb-5'>
      <h1 className='font-bold text-xl'><span>Add information regarding Course</span></h1>
      <Link to='lecture'>
      <Button variant="ghost" className="hover:text-blue-400">Go to lectures pages</Button>
      </Link>
    </div>
    <CourseTab/>
    </div>
  );
}
export default EditCourse;
