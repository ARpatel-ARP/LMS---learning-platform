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
     getCreatorCourse: builder.mutation({
        query: () => ({
          url:"/create",
          method:"GET"
        })  
     }) 
    })
})
export const {useCreateCourseMutation, useGetCreatorCourseMutation} = courseApi
    