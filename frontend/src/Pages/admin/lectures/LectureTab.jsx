import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import React from 'react';

const LectureTab = () => {
  return (
      <Card>
        <CardHeader>
            <div className='justify-between'>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription className="my-1">Make changes and click save when done</CardDescription>
            </div>
            <div>
                <Button className="bg-red-500">Remove Lecture</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div>
                <Label
                
            </div>
        </CardContent>
      </Card>
  );
}

export default LectureTab;
