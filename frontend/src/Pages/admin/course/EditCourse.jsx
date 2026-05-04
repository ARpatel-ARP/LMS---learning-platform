import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const EditCourse = () => {
  return (
    <div className='flex-1'>
    <div className='flex items-center justify-between mb-5'>
      <h1 className='font-bold text-xl'>Add information regarding Course</h1>
      <Link>
      <Button variant='link' className="font-medium text-large">Go to lectures pages</Button>
      </Link>
    </div>
    </div>
  );
}

export default EditCourse;
