import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCourse = () => {
  return (
    <div className="flex-1 mx-10 ">
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
      <div className="">
        <div className="flex-col flex w-fit py-3">
          <label>Title</label>
          <input
            className="pt-2"
            type="text"
            name="courseTitle"
            placeholder="Your Course Name"
          />
        </div>
        <div className="py-3"> 
          <label>Category</label>
          <Select >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="pt-15">Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
