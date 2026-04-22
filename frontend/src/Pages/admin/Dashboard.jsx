import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader>Total Sales</CardHeader>
        <CardContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, magni porro repellendus aut odio enim debitis mollitia dolorum nulla obcaecati minus explicabo autem vitae nihil pariatur? Voluptate deserunt debitis fugiat odio laudantium ipsum similique reprehenderit blanditiis ducimus, distinctio facere ullam, neque voluptatem quaerat veniam maxime.</CardContent>
      </Card>
    </div>
  )
}

export default Dashboard