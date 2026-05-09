import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor.jsx'
import React, { useState } from 'react';

const CourseTab = () => {
    const [input, setInput] = useState({
        courseTitle:"",
        subTitle:"",
        description:"",
        category:"",
        courseLevel:"",
        coursePrice:"",
        courseThumbnail:"",
    })
    const isPublished = true
  return (
   <>
    <Card>
        <CardHeader className='flex justify-between flex-row'>
            <div>
                <CardTitle> Basic course information</CardTitle>
                <CardDescription>
                    Make changes to your courses here. Click save when you are done 
                </CardDescription>
            </div>
            <div className='flex gap-2'>
                <Button variant='outline'>
                    {
                        isPublished ? "Unpublished" : "Published"
                    }
                </Button>
                <Button>Remove course</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 mt-5">
                <div>
                    <Label className="my-2 mx-1">Course Title</Label>
                        <Input
                        type='text'
                        name="Course Title"
                        placeholder="Example: Fullstack Developer"
                        />
                </div>
                <div>
                    <Label className="my-2 mx-1">Sub-Title</Label>
                        <Input
                        type='text'
                        name="SubTitle"
                        placeholder="Example: Become an advanced developer from zero basics"
                        />
                </div>
                <div>
                    <Label className="my-2 mx-1">Description</Label>
                    <RichTextEditor/>
                </div>
            </div>
        </CardContent>
    </Card>
   </>
  );
}

export default CourseTab;
