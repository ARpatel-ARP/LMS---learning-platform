import BuyCourseBtn from "@/components/BuyCourseBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import { useGetMyPurchasesQuery } from "@/features/api/paymentApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data: courseData, isLoading } = useGetCourseByIdQuery(courseId);
  const { data: purchaseData } = useGetMyPurchasesQuery();

  const course = courseData?.course;
  console.log("Lecture:", course?.lectures?.[0]);
  console.log("Video URL:", course?.lectures?.[0]?.videoUrl);
  const isPurchased = purchaseData?.purchases?.some(
    (p) => p.courseId?._id === courseId || p.courseId === courseId,
  );

  const handleContinueCourse = async () => {
    if (isPurchased) {
      navigate(`/course-progress/${courseId}`)
    }
  }

  if (isLoading) return <div className="mt-24 text-center">Loading...</div>;

  return (
    <div className="mt-24 space-y-5">
      <div className="text-white bg-[#170818]">
        <div className="max-w-7xl md:mx-22 py-8 px-4 flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{course?.courseTitle}</h1>
          <p>{course?.subTitle}</p>
          <span>
            Created By:{" "}
            <span className="italic underline cursor-pointer">
              {course?.creator?.name || "Instructor"}
            </span>
          </span>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p className="italic font-light">
              Last updated {new Date(course?.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between max-w-[95%]">
        <div className="md:m-5 mx-auto lg:mx-15 lg:px-10 w-[85%] lg:w-4/5">
          <h1 className="text-2xl font-bold mb-3">Description</h1>
          <p>{course?.description}</p>

          <div className="my-5">
            <Card className="md:w-full md:mx-auto ml-3">
              <CardHeader>
                <CardTitle className="font-bold text-xl">
                  Course Content
                </CardTitle>
                <CardDescription>
                  {course?.lectures?.length || 0} lectures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {course?.lectures?.map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span>
                      {lecture.isPreviewFree ? (
                        <PlayCircle size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                    </span>
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="md:w-3/4 md:mx-35 ml-5 mb-5">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                {course?.lectures?.[0]?.videoUrl && (
                  <ReactPlayer
                    key={course?.lectures?.[0]?.videoUrl}
                    src={course?.lectures?.[0]?.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
              <h1 className="text-lg">
                {course?.lectures?.[0]?.lectureTitle || "Preview unavailable"}
              </h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹{course?.coursePrice || 0}
              </h1>
            </CardContent>
            <CardFooter>
              {isPurchased ? (
                <Button
                onClick={handleContinueCourse}
                  className="w-full"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseBtn courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
