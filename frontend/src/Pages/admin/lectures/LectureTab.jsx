import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

import React, { useState } from "react";

const MEDIA_API = "http://localhost:8000/api/v1/media";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadvideoinfo, setUploadVideoInfo] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        
      } catch (error) {}
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="justify-between">
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription className="my-1">
            Make changes and click save when done
          </CardDescription>
        </div>
        <div>
          <Button className="bg-red-500">Remove Lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-3">
          <Label>Title</Label>
          <Input
            className="mt-2"
            type="text"
            placeholder="Ex: Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label className="my-2">
            Video <span className="text-red-500">*</span>
          </Label>
          <Input type="file" accept="video/*" className="w-fit" />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="free-mode" />
          <Label htmlFor="free-mode">Is this Video free</Label>
        </div>
        <div className="my-3">
          <Button>Update lecture</Button>
          <Button>Update lecture</Button>
          <Button>Update lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
