import { useParams } from "react-router-dom";
import { usePayment } from "@/hooks/usePayment";
import PaymentForm from "./PaymentForm";
import PaymentStatus from "./PaymentStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const { courseId } = useParams();
  const { status, paymentId, error, processPayment } = usePayment();  // renamed

  const COURSE_AMOUNT = 999;

  if (status === "success" || status === "failed") {
    return (
      <PaymentStatus
        status={status}
        paymentId={paymentId}              // renamed
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Complete Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentForm
            courseId={courseId}
            amount={COURSE_AMOUNT}
            onSubmit={processPayment}
            isLoading={status === "loading"}
          />
        </CardContent>
      </Card>
    </div>
  );
}