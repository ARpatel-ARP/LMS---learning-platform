import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Course = ({course}) => {
  return (
    <Card className="overflow-hidden w-full p-0 text-white bg-gray-950 shadow-[0_0_20px_rgba(0,0,0,0.6)] dark:shadow-[0_0_15px_rgba(0,206,209,0.2)] hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
      <img
        src= {course.courseThumbnail}
         alt="Course"
        className="w-full h-48 object-cover block"
      />
      <CardContent className="pb-5 space-y-3 ">
        <h1 className="font-bold hover:underline text-lg truncate">
        {course.courseTitle}
        </h1>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 ">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={ course.creator.photoUrl || "https://github.com/shadcn.png"}
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{course.creator?.name}</h1>
          </div>
          <Badge className="bg-white text-black  text-sm px-3 py-3">
           {course.courseLevel}
          </Badge>
        </div>
        <div className=" text-white font-bold text-center text-2xl">
          <span>{course.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
  );
};
export default Course;
