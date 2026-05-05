import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; 
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Input } from "@/components/ui/input";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    if (!courseTitle.trim() || !category) {
      toast.error("Please enter a course title and select a category.");
      return;
    }
  
    try {
      await createCourse({ courseTitle, category }).unwrap();
    } catch (err) {
      console.error("Create course failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created");
      navigate("/admin/course"); // 
    }
    if (error) {
      const msg =
        error?.data?.message || error?.error || "Failed to create course.";
      toast.error(msg);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Lets add Course</h1>
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
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div className="py-3">
          <label className="block mb-2">Category</label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next.js">Next.js</SelectItem>
                <SelectItem value="AI-ML">AI-ML</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="React.js">React.js</SelectItem>
                <SelectItem value="Express.js">Express.js</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
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
};

export default AddCourse;
