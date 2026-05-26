import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
            <div className='mt-3'>
                <Label>Title</Label>
                <Input
                className="mt-2"
                type="text"
                placeholder="Ex: Introduction to Javascript"
                />
            </div>
            <div>
                <Label>Video <span className='text-red-500'>*</span></Label>
                <Input
                type="file"
                className="w-fit"
                />
            </div>
        </CardContent>
      </Card>
  );
}

export default LectureTab;
