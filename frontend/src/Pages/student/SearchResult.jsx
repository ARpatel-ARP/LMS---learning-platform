import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-ull md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-Thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-2xl"
        />
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{course.courseTitle}</h1>
            <h1 className="text-gray-200">{course?.subTitle || "subTitle : none"}</h1>
            <p className="flex gap-1.5">
                <span className="">Instructor :</span><span className="font-bold">{course.creator?.name}</span>
            </p>
            <Button className="w-22">{course.courseLevel}</Button>
        </div>
      </Link>
      <div className="mt-4 mr-10 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-medium md:text-sm">₹{course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
