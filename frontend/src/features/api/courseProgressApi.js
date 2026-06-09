import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROG_API = "http://localhost:8000/api/v1/progress";
export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROG_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProg:builder.mutation({
        query: ({courseId, lectureId}) =>( {
          url:`/${courseId}/lecture/${lectureId}/view`,
          method:"POST"
        })
    }),
    completeCourse:builder.mutation({
        query:(courseId) => ({
          url:`/${courseId}/complete`,
          method:"POST"
        })
        
    }),
    incompleteCourse:builder.mutation({
        query:(courseId) => ({
          url: `/${courseId}/incomplete`,
          method:"POST"
        })
        
    })
        
  }),
});

export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgMutation,
    useCompleteCourseMutation,
    useIncompleteCourseMutation,

} = courseProgressApi;
