import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import React from 'react';

const CourseTab = () => {
    const isPublished = true
  return (
   <>
    <Card>
        <CardHeader>
            <div>
                <CardTitle> Basic course information</CardTitle>
                <CardDescription>
                    Make changes to your courses here. Click save when you are done 
                </CardDescription>
            </div>
            <div>
                <Button variant='outline'>
                    {
                        isPublished ? "Unpublished" : "Published"
                    }

                </Button>
            </div>
        </CardHeader>
    </Card>
   </>
  );
}

export default CourseTab;
