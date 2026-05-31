export default function PaymentStatus({ status, paymentId, error, onRetry }) {
  if (status === "success") {
    return (
      <div className="text-center space-y-2 py-8">
        <div className="text-5xl">✅</div>
        <h2 className="text-xl font-semibold">Payment Successful!</h2>
        <p className="text-muted-foreground text-sm">Payment ID: {paymentId}</p>
        <p className="text-sm text-green-600">You are now enrolled in the course.</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center space-y-2 py-8">
        <div className="text-5xl">❌</div>
        <h2 className="text-xl font-semibold">Payment Failed</h2>
        <p className="text-sm text-red-500">{error}</p>
        <button onClick={onRetry} className="mt-4 text-sm underline text-blue-500">
          Try Again
        </button>
      </div>
    );
  }

  return null;
}