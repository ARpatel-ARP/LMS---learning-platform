import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BuyCourseBtn = ({ courseId }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleBuy = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/checkout/${courseId}`);
  };

  return (
    <Button className="w-full" onClick={handleBuy}>
      Purchase Course
    </Button>
  );
};

export default BuyCourseBtn;