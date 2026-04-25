import React from "react";

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
      <div className="space-y-4">
        <div className="flex-col flex w-fit">
          <label>Title</label>
          <input 
          className=""
          type="text"
          name="courseTitle"
          placeholder="Your Course Name" />
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
