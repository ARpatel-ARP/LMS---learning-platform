import { Button } from "@/components/ui/button";

export default function PaymentStatus({ isSuccess, paymentId, error, onRetry, onContinue }) {
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-28 text-center space-y-3 px-4">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-semibold">Payment Successful!</h2>
        <p className="text-muted-foreground text-sm">Payment ID: {paymentId}</p>
        <p className="text-sm text-green-600">You are now enrolled in the course.</p>
        <Button className="w-full mt-4" onClick={onContinue}>
          Go to My Learning
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-28 text-center space-y-3 px-4">
      <div className="text-6xl">❌</div>
      <h2 className="text-2xl font-semibold">Payment Failed</h2>
      <p className="text-sm text-red-500">{error}</p>
      <Button variant="outline" className="w-full mt-4" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}