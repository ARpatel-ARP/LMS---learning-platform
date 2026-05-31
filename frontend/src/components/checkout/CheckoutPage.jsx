import { useParams, useNavigate } from "react-router-dom";
import { useInitiatePaymentMutation } from "@/features/api/paymentApi";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import PaymentForm from "./PaymentForm";
import PaymentStatus from "./PaymentStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data: courseData } = useGetCourseByIdQuery(courseId);
  const [initiatePayment, { isLoading, isSuccess, isError, data, error }] =
    useInitiatePaymentMutation();

  const course = courseData?.course;

  if (isSuccess || isError) {
    return (
      <PaymentStatus
        isSuccess={isSuccess}
        paymentId={data?.paymentId}
        error={error?.data?.message || "Payment failed. Please try again."}
        onRetry={() => window.location.reload()}
        onContinue={() => navigate("/my-learning")}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto mt-28 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Complete Payment</CardTitle>
          {course && (
            <p className="text-sm text-muted-foreground">{course.courseTitle}</p>
          )}
        </CardHeader>
        <CardContent>
          <PaymentForm
            courseId={courseId}
            amount={course?.coursePrice || 0}
            onSubmit={initiatePayment}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}