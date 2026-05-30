import { Button } from "@/components/ui/button";
import {
  useGetCourseByIdQuery,
  usePublisheCourseMutation,
  useUpdateCourseMutation,
} from "@/features/api/courseApi";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor.jsx";
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
import { Loader, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const changeEvenHandler = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const { courseId } = useParams();
  const { data: courseByIdData, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId);
  const course = courseByIdData?.course;
  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle:
          !course.subTitle || course.subTitle === "undefined"
            ? ""
            : course.subTitle,
        description:
          !course.description || course.description === "undefined"
            ? ""
            : course.description,
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: course.courseThumbnail || "",
      });
    }
  }, [course]);

  const [updateCourse, { data, isLoading, error, isSuccess }] =
    useUpdateCourseMutation();

    const [publishCourse, {}] = usePublisheCourseMutation()
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle || "");
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    // Step 3 — your API call goes here
    await updateCourse({ courseId, formData });
  };

  const publishStatusHandler = async (action) => {
      try {
        const response = await publishCourse({courseId, query:action})
        if (response.data) {
          toast.success(response.data.message)
        }
      } catch (error) {
        toast.error("Failed to publish or unpublish course")
      }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update Course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between flex-row">
          <div>
            <CardTitle> Basic course information</CardTitle>
            <CardDescription>
              Make changes to your courses here. Click save when you are done
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
            disabled={courseByIdData?.course?.lectures?.length === 0}
              variant="outline"
              onClick={() =>
                publishStatusHandler(
                  courseByIdData?.course.isPublished ? "false" : "true",
                )
              }
            >
              {/* If course is published → passes "false" (unpublish it)
                 If course is not published → passes "true" (publish it) */}
              {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
            </Button>
            <Button>Remove course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label className="my-2 mx-1">Course Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEvenHandler}
                placeholder="Example: Fullstack Developer"
              />
            </div>
            <div>
              <Label className="my-2 mx-1">Sub-Title</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEvenHandler}
                placeholder="Example: Become an advanced developer from zero basics"
              />
            </div>
            <div>
              <Label className="my-2 mx-1">Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label className="my-2 mx-1">Category</Label>
                <Select value={input.category} onValueChange={selectCategory}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="AI-ML">AI-ML</SelectItem>
                      <SelectItem value="Cloud Computing">
                        Cloud Computing
                      </SelectItem>
                      <SelectItem value="React.js">React.js</SelectItem>
                      <SelectItem value="Express.js">Express.js</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="my-2 mx-1">Course Level</Label>
                <Select
                  value={input.courseLevel}
                  onValueChange={selectCourseLevel}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Levels</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="my-2 mx-1">Price in (INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEvenHandler}
                  placeholder="enter price"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <Label className="my-2 mx-1">Course Thumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit"
              />
              {(previewThumbnail || input.courseThumbnail) && (
                <img
                  src={previewThumbnail || input.courseThumbnail}
                  className="w-37 h-24 object-cover rounded-md my-2"
                  alt="Course-thumbnail"
                />
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/admin/course")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={submitHandler}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseTab;
