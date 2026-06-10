import React from "react";
import Course from "./Course";
import { useGetMyPurchasesQuery } from "@/features/api/paymentApi";
import { Link } from "react-router-dom";

const MyLearningSkeleton = () => (
  <div className="flex flex-col gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-4 bg-gray-100 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
        <div className="w-44 h-28 shrink-0 rounded-lg bg-gray-300 dark:bg-slate-600 animate-pulse" />
        <div className="flex flex-col gap-3 flex-1">
          <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-slate-600 animate-pulse" />
          <div className="h-3 w-1/3 rounded bg-gray-300 dark:bg-slate-600 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const MyLearning = ({course}) => {
  const { data, isLoading } = useGetMyPurchasesQuery();
  const myLearningCourses = data?.purchases?.map((p) => p.courseId) || [];
  console.log(myLearningCourses);
  

  return (
    <div className="max-w-4xl mx-auto my-20 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-right md:text-center text-gray-900 dark:text-slate-100">
        MY LEARNING
      </h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p>You are not enrolled in any courses</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myLearningCourses.map((course, i) => (
              <Course key={i} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;