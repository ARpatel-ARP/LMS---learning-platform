import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@hugeicons/core-free-icons';
import React from 'react';

const CourseTab = () => {
  return (
    <Card>
        <CardHeader>
            <div>
                <CardTitle> Basic course information</CardTitle>
                <CardDescription>
                    Make changes to your courses here. Click save when you are done 
                </CardDescription>
            </div>
        </CardHeader>
    </Card>
  );
}

export default CourseTab;
