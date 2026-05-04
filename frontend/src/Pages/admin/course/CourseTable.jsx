import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge, Edit, Edit2, PlusCircle } from "lucide-react";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  if (isLoading) return <h1>Loading...</h1>;
  const courses = data?.courses || [];
  console.log("data ->", data);
  return (
    <>
      <div>
        <Button onClick={() => navigate(`create`)} className="mb-10 mt-5">
          Create New Course
          <PlusCircle size={22} />
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Button>{course.isPublished ? "Published" : "Draft"}</Button>
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/course/${course._id}`}></Link>
                <Button
                  variant="ghost"
                >
                  <Edit2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CourseTable;
