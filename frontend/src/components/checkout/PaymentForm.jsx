import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formatCard = (val) =>
  val.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();

export default function PaymentForm({ courseId, amount, onSubmit, isLoading }) {
  const [form, setForm] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber") value = formatCard(value);
    if (name === "expiry") value = value.replace(/[^\d/]/g, "").slice(0, 5);
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      cardNumber: form.cardNumber.replace(/\s/g, ""),
      courseId,
      amount,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="my-2">Cardholder Name</Label>
        <Input name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <Label className="my-2">Card Number</Label>
        <Input name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} required />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label className="my-2">Expiry</Label>
          <Input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
        </div>
        <div className="flex-1">
          <Label className="my-2">CVV</Label>
          <Input name="cvv" placeholder="123" value={form.cvv} onChange={handleChange} required />
        </div>
      </div>
      <p className="text-sm font-semibold">Amount: ₹{amount}</p>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : `Pay ₹${amount}`}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Test fail: use any card ending in <code>0000</code>
      </p>
    </form>
  );
}