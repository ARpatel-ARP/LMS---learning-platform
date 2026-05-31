import { processMockPayment } from "../services/mockGateway.service.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import Course from "../models/course.model.js";

export const initiatePayment = async (req, res) => {
  try {
    const { amount, cardNumber, cvv, expiry, courseId } = req.body;
    const userId = req.user._id;

    // Check if already purchased
    const alreadyPurchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res.status(400).json({ success: false, message: "Course already purchased" });
    }

    // Call mock gateway
    const gatewayResponse = await processMockPayment({ amount, cardNumber, cvv, expiry });

    const paymentId = gatewayResponse.transactionId || `MOCK_FAIL_${Date.now()}`;

    // Save to CoursePurchase
    const purchase = await CoursePurchase.create({
      userId,
      courseId,
      amount,
      status: gatewayResponse.success ? "completed" : "failed",
      paymentId,
    });

    if (!gatewayResponse.success) {
      return res.status(402).json({
        success: false,
        message: gatewayResponse.message,
        purchaseId: purchase._id,
      });
    }

    // Enroll user in course
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });

    return res.status(200).json({
      success: true,
      message: "Payment successful. You are now enrolled!",
      paymentId: purchase.paymentId,
      purchaseId: purchase._id,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};