import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCreateCourseMutation } from "@/features/api/courseApi";

const CreateLecture = () => {
     const [lectureTitle, setLectureTitle] = useState("");
     const params = useParams()
     const courseId = params.courseId
      const navigate = useNavigate();
        const [createCourse, { data, isLoading, error, isSuccess }] =
          useCreateCourseMutation();
       const createCourseHandler = async () => {
          try {
            await createCourse({lectureTitle}).unwrap();
          } catch (err) {
            console.error("Create course failed:", err);
          }
        };
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
          <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
