'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const PieChartComponent = ({ questionStats }: { questionStats: any }) => {
  const pieData = [
    { name: 'Easy', value: questionStats.easy },
    { name: 'Medium', value: questionStats.medium },
    { name: 'Hard', value: questionStats.hard },
  ]

  const COLORS = ['#4ade80', '#facc15', '#f87171']

  return (
    <PieChart width={400} height={300} className="focus:outline-none outline-none border-none" tabIndex={-1}>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export default PieChartComponent
