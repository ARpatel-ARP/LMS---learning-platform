import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor.jsx";
import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, Loader2 } from "lucide-react";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const changeEvenHandler = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const isLoading = false
  const isPublished = true;
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between flex-row">
          <div>
            <CardTitle> Basic course information</CardTitle>
            <CardDescription>
              Make changes to your courses here. Click save when you are done
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              {isPublished ? "Unpublished" : "Published"}
            </Button>
            <Button>Remove course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label className="my-2 mx-1">Course Title</Label>
              <Input
                type="text"
                name="Course Title"
                value={input.courseTitle}
                onChange={changeEvenHandler}
                placeholder="Example: Fullstack Developer"
              />
            </div>
            <div>
              <Label className="my-2 mx-1">Sub-Title</Label>
              <Input
                type="text"
                name="SubTitle"
                value={input.subTitle}
                onChange={changeEvenHandler}
                placeholder="Example: Become an advanced developer from zero basics"
              />
            </div>
            <div>
              <Label className="my-2 mx-1">Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label className="my-2 mx-1">Category</Label>
                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="AI-ML">AI-ML</SelectItem>
                      <SelectItem value="Cloud Computing">
                        Cloud Computing
                      </SelectItem>
                      <SelectItem value="React.js">React.js</SelectItem>
                      <SelectItem value="Express.js">Express.js</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div >
                <Label className="my-2 mx-1">Course Level</Label>
                 <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Levels</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="my-2 mx-1">Price in (INR)</Label>
                <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEvenHandler}
                placeholder="enter price"
                className="w-full"
                />
              </div>
            </div>
              <div>
                <Label className="my-2 mx-1">Course Thumbnail</Label>
                <Label className="my-2 mx-1">Course Thumbnail</Label>
                <Label className="my-2 mx-1">Course Thumbnail</Label>
                <Input
                type="file"
                accept="image/*"
                className="w-fit"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  {
                    isLoading? (
                      <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      Please wait
                      </>
                    ):"Save"
                  }
                </Button>
              </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseTab;
