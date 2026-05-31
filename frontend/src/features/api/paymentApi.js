import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PAYMENT_API = "http://localhost:8000/api/v1/payment";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PAYMENT_API,
    credentials: "include",
  }),
  tagTypes: ["MyPurchases"],
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/initiate",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["MyPurchases"],
    }),
    getMyPurchases: builder.query({
      query: () => ({
        url: "/my-purchases",
        method: "GET",
      }),
      providesTags: ["MyPurchases"],
    }),
  }),
});

export const { useInitiatePaymentMutation, useGetMyPurchasesQuery } = paymentApi;