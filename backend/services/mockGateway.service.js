import { v4 as uuidv4 } from "uuid";

export const processMockPayment = ({ amount, cardNumber, cvv, expiry }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Test card ending in 0000 always fails
      if (cardNumber.replace(/\s/g, "").endsWith("0000")) {
        return resolve({ success: false, message: "Card declined by issuer" });
      }
      // 10% random failure
      const isSuccess = Math.random() > 0.1;
      const isSuccess = Math.random() > 0.1;
      const isSuccess = Math.random() > 0.1;
      if (isSuccess) {
        resolve({
          success: true,
          transactionId: `MOCK_TXN_${uuidv4().split("-")[0].toUpperCase()}`,
          message: "Payment approved",
        });
      } else {
        resolve({ success: false, message: "Payment gateway timeout. Try again." });
      }
    }, 1500);
  });
};