import { Edit } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lecture = ({lecture, courseId, index}) => {
  const navigate = useNavigate()
  const goToUpdateLecture = () => {
    navigate(`/admin/course/${courseId}/lecture/${lecture._id}`)
  }
  
  return (
    <div className='flex items-center justify-between bg-gray-200 dark:bg-[#1F1F1F] px-4 py-2 rounded-md'>
      <h1 className='font-bold text-gray-800 dark:text-gray-300'>
        Lecture - {index+1}:{lecture.lectureTitle}</h1>
      <Edit
      onClick={goToUpdateLecture}
      size={24}
      className='cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'/>
    </div>
  );
}

export default Lecture;
