import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useUpdateLectureMutation } from "@/features/api/courseApi";
import { useCompleteCourseMutation, useGetCourseProgressQuery, useIncompleteCourseMutation, useUpdateLectureProgMutation } from "@/features/api/courseProgressApi";
import {
  Badge,
  BadgeCheck,
  CheckCircle,
  CirclePlay,
  TypeOutline,
} from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CourseProgress = () => {
  const [currentLecture, setCurrentLecture] = useState();

  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, refetch, isError } = useGetCourseProgressQuery(courseId);
  const [updatedLectureProgress] = useUpdateLectureProgMutation()
  const [completeCourse] = useCompleteCourseMutation()
  const [incompleteCourse] = useIncompleteCourseMutation()

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load</p>;
  console.log(data);

  const { courseDetail, progress, completed } = data.data;
  const { courseTitle } = courseDetail;
  const { lectureTitle } = courseDetail.lectures;

  const initialLecture =
    currentLecture || (courseDetail.lectures && courseDetail.lectures[0]);

    const isLecCompleted = (lectureId) => {
      // if the lectureid and prog viewed is equal or true then isLecCompl is true
      return progress.some((prog) => prog.lectureId === lectureId.toString() && prog.viewed 
      )
    }

    const handleLecSelect = async (lecture) => {
      setCurrentLecture(lecture)
    }
    const handleLectureProgress = async (lectureId) => {
      await updatedLectureProgress({courseId, lectureId})
      refetch()
    }
    const handleCompleteCourse = async () => {
    await completeCourse(courseId);
    refetch();
  };

  const handleIncompleteCourse = async () => {
    await incompleteCourse(courseId);
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-25">
      {/* Display Course name */}
      <div className="flex justify-between mb-5">
        <h1 className="font-bold text-2xl">{courseTitle}</h1>
        {completed ? (
          <Button
            onClick={handleIncompleteCourse}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            ✅ Completed — Mark Incomplete
          </Button>
        ) : (
          <Button onClick={handleCompleteCourse}>Mark as Completed</Button>
        )}
      </div>
      <div className="w-full mt-10 flex gap-x-10 flex-col md:flex-row">
        <div className="w-1/2">
          <Card>
            <CardContent>
              <div>
                <video
                  src={currentLecture?.videoUrl || initialLecture?.videoUrl}
                  controls
                  onPlay={()=>handleLectureProgress(currentLecture?._id || initialLecture._id)}
                ></video>
              </div>
            </CardContent>
          </Card>
          {/* Display current watching lecture title */}
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${courseDetail.lectures.findIndex((lec) => lec._id == (currentLecture?._id || initialLecture._id)) + 1} : ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar */}
        <div className="md:w-2/5 flex flex-col w-full border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course lectures</h2>
          <div className="flex-1 max-h-70 overflow-y-auto  [&::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
            {courseDetail?.lectures.map((lecture) => (
              <Card
                key={lecture._id} 
                className={`mb-3 hover:cursor-pointer dark:text-white transition transform ${lecture._id === currentLecture?._id ? 'bg-gray-200   dark:bg-gray-700' : 'dark:bg-gray-900'}`}
                onClick={()=> handleLecSelect(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLecCompleted(lecture._id) ? (
                      <CheckCircle size={24} className="text-green-400 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLecCompleted(lecture._id) && (
                    <Button className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold">
                      Completed
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
