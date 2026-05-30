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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

import React, { useState } from "react";
import { toast } from "sonner";

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
        if (res.data.success) {
          setUploadVideoInfo({videoUrl:res.data.data.url, publicId:res.data.data.public_id})
          setBtnDisable(false);
            toast.success("Video uploaded successfully")
  console.log("API response:", res.data);
        } else{
            console.log("success is false:", res.data);
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed")
        
      }
      finally{
        setMediaProgress(false)
      }
    }
  };
  return (
    <Card>
      <Button onClick={() => toast.success("test toast")}>Test Toast</Button>
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
          <Input type="file" onChange={fileChangeHandler} accept="video/*" className="w-fit" />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="free-mode" />
          <Label htmlFor="free-mode">Is this Video free</Label>
        </div>
        {
          mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress}/>
              <p>{uploadProgress}% uploaded</p>
            </div>
          )
        }
        <div className="my-3">
          <Button>Update lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
