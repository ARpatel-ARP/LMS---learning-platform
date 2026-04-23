import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='p-10'>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols- mt-10'>
        <Card className="w-25">
          <CardHeader className="">Total Sales</CardHeader>
          <CardContent>$12,400</CardContent>
        </Card>
        {/* Add more stat cards here */}
      </div>
    </div>
  )
}

export default Dashboard