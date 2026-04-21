import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";

const courses = [1, 2, 3, 4, 5, 6, 7, 8];

const Courses = () => {
  const isLoading = false;
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="font-bold text-4xl text-center mt-6 mb-10 ">Our Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CourseSkeleton key={i} />)
            : courses.map((course, i) => <Course key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <Skeleton className="w-full h-40 rounded-none" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-14" />
        </div>
        <div className="flex items-center justify-between mt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
};