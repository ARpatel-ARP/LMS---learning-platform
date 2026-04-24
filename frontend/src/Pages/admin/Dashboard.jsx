import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=''>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        <Card className="w-40 h-30 py-6 hover:shadow-zinc-400 dark:hover:shadow-zinc-900 dark:shadow-xl transition-all duration-300 shadow-xl">
          <CardHeader className="font-bold text-xl">Total Sales</CardHeader>
          <CardContent className="text-lg dark:text-gray-300">$12,400</CardContent>
        </Card>
        {/* Add more stat cards here */}
      </div>
    </div>
  )
}

export default Dashboard