import { useState } from "react";
import { initiatePaymentAPI } from "../services/paymentService";

export const usePayment = () => {
  const [status, setStatus] = useState("idle");
  const [paymentId, setPaymentId] = useState(null);   // renamed from transactionId
  const [error, setError] = useState(null);

  const processPayment = async (paymentData) => {
    setStatus("loading");
    setError(null);
    try {
      const { data } = await initiatePaymentAPI(paymentData);
      setPaymentId(data.paymentId);                    // renamed
      setStatus("success");
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
      setStatus("failed");
    }
  };

  return { status, paymentId, error, processPayment };  // renamed
};