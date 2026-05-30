import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import reducer from "../authSlice";

const COURSE_API = "http://localhost:8000/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/create",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course", "Refetch_Lecture"],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Course_Detail"],
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course", "Refetch_Course_Detail"],
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query:(courseId) => ({
        url: `/${courseId}/lecture`,
        method:"GET"
      }),
      providesTags:['Refetch_Lecture']
    }),
    updateLecture: builder.mutation({
      query:({lectureTitle, videoInfo, isPreviewFree, courseId, lectureId}) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method:"PUT",
        body:{lectureTitle, videoInfo, isPreviewFree}
      })
    }),
    removeLecture: builder.mutation({
      query:(lectureId) => ({
        url:`/lecture/${lectureId}`,
        method:"DELETE"
      }),
      invalidatesTags:["Refetch_Lecture"]
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url:`/lecture/${lectureId}`,
        method:"GET"
      })
    })
  }),
});
export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useUpdateLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery
} = courseApi;
