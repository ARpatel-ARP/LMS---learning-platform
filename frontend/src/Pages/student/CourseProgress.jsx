import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useIncompleteCourseMutation,
  useUpdateLectureProgMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const [currentLecture, setCurrentLecture] = useState(null);

  const { courseId } = useParams();

  const { data, isLoading, refetch, isError } = useGetCourseProgressQuery(courseId);
  const [updatedLectureProgress] = useUpdateLectureProgMutation();
  const [completeCourse, {data:markComplData, isSucces:ComplSuccess}] = useCompleteCourseMutation();
  const [incompleteCourse, {data:markInComplData, isSucces:InComplSuccess}] = useIncompleteCourseMutation();
  
    useEffect(() => {
       if (ComplSuccess) {
        toast.success(markComplData.message)
      }
      if (InComplSuccess) {
        toast.success(markInComplData.message)
      }
        
    }, [ComplSuccess, InComplSuccess]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load</p>;

  const { courseDetail, progress, completed } = data.data;
  const { courseTitle } = courseDetail;

  const initialLecture = courseDetail.lectures?.[0];
  const activeLecture = currentLecture || initialLecture;

  const isLecCompleted = (lectureId) => {
    return progress.some(
      (prog) =>
        prog.lectureId.toString() === lectureId.toString() && prog.viewed 
    );
  };
  const handleLectureProgress = async (lectureId) => {
    await updatedLectureProgress({ courseId, lectureId });
    await refetch();
  };

  const handleLecSelect = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id)
  };


  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
    await refetch();
  };

  const handleIncompleteCourse = async () => {
    await incompleteCourse(courseId);
    await refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-25">
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
        {/* Video Player */}
        <div className="w-1/2">
          <Card>
            <CardContent>
              <video
                src={activeLecture?.videoUrl}
                controls
                onEnded={() => handleLectureProgress(activeLecture?._id)}
              />
            </CardContent>
          </Card>
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetail.lectures.findIndex(
                  (lec) => lec._id.toString() === activeLecture?._id?.toString()
                ) + 1
              } : ${activeLecture?.lectureTitle}`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="md:w-2/5 flex flex-col w-full border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 max-h-70 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {courseDetail?.lectures.map((lecture) => (
              <Card
                key={lecture._id.toString()} 
                className={`mb-3 hover:cursor-pointer dark:text-white transition transform ${
                  lecture._id.toString() === currentLecture?._id?.toString()
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "dark:bg-gray-900"
                }`}
                onClick={() => handleLecSelect(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLecCompleted(lecture._id) ? (
                      <CheckCircle size={24} className="text-green-400 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <CardTitle className="text-lg font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
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