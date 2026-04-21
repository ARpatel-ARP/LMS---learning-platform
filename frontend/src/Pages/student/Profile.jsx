import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";

const EnrolledCourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );
};

const Profile = () => {
  const [name, setName] = useState(" ")
  const [profilePhoto, setProfilePhoto] = useState(" ")
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError, isSuccess, error }] = useUpdateUserMutation()

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0]
    if (file) setProfilePhoto(file)
  }

  const updateUserHandler = async () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("profilePhoto", profilePhoto)
    await updateUser(formData)
  }
  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success(data.message || "Profile Updated")
    }
    if (isError) {
      toast.error(error.message || "Profile updation failed")
    }
  }, [isError, updateUserData, isSuccess, error])


  // if (isLoading) return <h1>Profile Loading</h1>

  if (!data) return <h1>Unable to load profile</h1>

  const { user } = data
  return (
    <div className="max-w-4xl mx-auto px-7 my-24 w-fit md:w-full dark:bg-black  bg-gray-200 rounded-2xl p-5">
      <h1 className="font-bold text-center md:text-left px-5 text-2xl">
        PROFILE
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 my-5">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
          <AvatarImage
            src={user.photoUrl || "https://github.com/shadcn.png"}
            alt="@shadcn"
            className=""
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="mt-5">
          <div className="mb-2">
            <h1 className="font-semibold flex gap-2">
              Name: <span className="font-light">{user.name}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold flex gap-2">
              Email: <span className="font-light">{user.email}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold flex gap-2">
              Role: <span className="font-light">{user.role.toUpperCase()}</span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
              <DialogHeader className="text-center">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here
                  <br />
                  Click save once done
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Image</Label>
                  <Input onChange={onChangeHandler} type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter className="md:px-30">
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* ENROLLED-COURSES  */}
      <div className="p-5 space-y-5">
        <h1 className="font-medium text-lg">Course you are enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <EnrolledCourseSkeleton key={i} />
            ))
          ) : user.enrolledCourses.length === 0 ? (
            <h1>You Have not enrolled in any courses yet</h1>
          ) : (
            user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;