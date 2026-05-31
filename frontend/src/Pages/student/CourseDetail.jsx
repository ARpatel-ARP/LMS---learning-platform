import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetail = () => {
  return (
    <div className="mt-24 space-y-5">
      <div className="text-white bg-[#170818]">
        <div className="max-w-7xl md:mx-22 py-8 px-4 flex flex-col gap-2">
          <h1 className="font-bold text-3xl ">Course Title</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            rem maiores ipsam?
          </p>
          <span>
            Created By :{" "}
            <span className="italic underline cursor-pointer">
              RAUT-stack
            </span>{" "}
          </span>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p className="italic font-light">Last updated 2026-3-14</p>
          </div>
          <p>Students enrolled: 1</p>
        </div>
      </div>

      <div className="flex flex-col  lg:flex-row justify-between  max-w-[95%]">
        <div className=" md:m-5 mx-auto lg:mx-15 lg:px-10 w-[85%] lg:w-4/5 md:text-left text-center">
          <h1 className="text-2xl font-bold mb-3">Description</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur vitae nihil magnam omnis sit porro obcaecati maxime
            quas? Eligendi, a? Nostrum laboriosam fuga provident. Quod eveniet
            maiores officiis. Quod suscipit iure nam laborum quidem! Ut est
            repellendus, doloremque dolor repellat nemo vero quo harum a
            inventore. Vero quisquam inventore mollitia?
          </p>
          <div className="my-5">
            <Card className="md:w-1/2 w-full md:mx-auto ml-3">
              <CardHeader>
                <CardTitle className="font-bold text-xl">
                  Course Content
                </CardTitle>
                <CardDescription className="px-1">
                  no of lectures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span>
                      {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                    </span>{" "}
                    <p>Lecture title</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-full lg:1/3 ">
                <Card className="md:w-3/4 md:mx-35 ml-5 mb-5">
                    <CardContent className="p-4 flex flex-col">
                        <div className="w-full aspect-video mb-4">
                            Video
                        </div>
                        <h1>Lecture title</h1>
                        <Separator className="my-2"/>
                        <h1 className=""></h1>
                    </CardContent>
                </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
