import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import reducer from "../authSlice";

const COURSE_API = "http://localhost:8000/api/v1/course"

export const courseApi = createApi({
    reducerPath:"courseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_API,
        credentials:"include"
    }),
    endpoints: (builder) => ({
     createCourse: builder.mutation({
        query: ({courseTitle, category}) => ({
          url:"/create",
          method:"POST",
          body:{courseTitle, category}
        })  
     }),
     getCreatorCourse: builder.query({
        query: () => ({
          url:"/",
          method:"GET"
        })  
     }),
      updateCourse: builder.mutation({
        query: ({courseId, formData}) => ({
          url:`/${courseId}`,
          method:"PUT",
          body:formData
        })  
     }),
     getCourseById: builder.query({
      query: (courseId) => ({
        url:`/${courseId}`,
        method: "GET",
      })
      
     })
    })
})
export const {useCreateCourseMutation, useGetCreatorCourseQuery, useUpdateCourseMutation, useGetCourseByIdQuery} = courseApi
    