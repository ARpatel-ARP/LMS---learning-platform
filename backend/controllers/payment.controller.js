import { processMockPayment } from "../services/mockGateway.service.js";
import { CoursePurchase } from "../models/purchaseCourse.model.js"; // ✅ correct filename
import { Course } from "../models/course.model.js"; // ✅ named export
import { User } from "../models/user.model.js";

export const initiatePayment = async (req, res) => {
  try {
    const { amount, cardNumber, cvv, expiry, courseId } = req.body;
    const userId = req.id;

    const alreadyPurchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res
        .status(400)
        .json({ success: false, message: "Course already purchased" });
    }

    const gatewayResponse = await processMockPayment({
      amount,
      cardNumber,
      cvv,
      expiry,
    });

    const paymentId =
      gatewayResponse.transactionId || `MOCK_FAIL_${Date.now()}`;

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
      });
    }

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

    return res.status(200).json({
      success: true,
      message: "Payment successful. You are now enrolled!",
      paymentId: purchase.paymentId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/payment/my-purchases
export const getMyPurchases = async (req, res) => {
  try {
    const purchases = await CoursePurchase.find({
      userId: req.id,
      status: "completed",
    }).populate({
      path: "courseId",
      populate: {
        path: "creator",
        select: "name photoUrl",
      },
    });

    return res.status(200).json({ success: true, purchases });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
