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
import {
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
  useUpdateLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8000/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

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
        if (res.data.data) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success("Video uploaded successfully");
          console.log("API response:", res);
        } else {
          console.log("success is false:", res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);

  const [updateLecture, { data, isLoading, error, isSuccess }] =
    useUpdateLectureMutation();

  const updateLectureHandler = async () => {
    await updateLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureId,
      isPreviewFree: isFree,
    });
    console.log({ lectureTitle, uploadVideoInfo, courseId, lectureId, isFree });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  const { data: lecData, isLoading: LecLoading } =
    useGetLectureByIdQuery(lectureId);
  const lecture = lecData?.lecture;
  useEffect(() => {
    if (lecData) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo({
        videoUrl: lecture.videoUrl,
        publicId: lecture.publicId,
      });
    }
  }, [lecture]);
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
          <Button
            disabled={removeLoading}
            className="bg-red-500"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-3">
          <Label>Title</Label>
          <Input
            className="mt-2"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex: Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label className="my-2">
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            onChange={fileChangeHandler}
            accept="video/*"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="free-mode"
            checked={isFree}
            onCheckedChange={(value) => setIsFree(value)}
          />
          <Label htmlFor="free-mode">Is this Video free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="my-3">
          <Button disabled={isLoading} onClick={updateLectureHandler}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
