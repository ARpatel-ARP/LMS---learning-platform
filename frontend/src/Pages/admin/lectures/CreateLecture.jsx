import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError, refetch
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error]);
  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Lets add Lectures</h1>
        <p className="text-sm py-3">
          Adding a new course to the platform is a straightforward process that
          allows administrators to expand the learning catalog and provide
          students with fresh, engaging content. To get started, simply navigate
          to the course creation section, where you will be prompted to fill in
          essential details such as the course title, description, category, and
          difficulty level.
        </p>
      </div>
      <div>
        <div className="flex-col flex w-fit py-3">
          <label>Title</label>
          <Input
            className="pt-2 border border-transparent rounded w-full px-2 outline-none focus:border-gray-500"
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lecture...</p>
          ) : lectureError ? (
            <p>Failed to load lecture</p>
          ) : lectureData?.lectures?.length === 0 ? (
            <p>No lecture available</p>
          ) : (
            lectureData.lectures.map((lecture,index) => (
              <Lecture key={lecture._id} lecture={lecture} index={index}  courseId={courseId}/>

            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
