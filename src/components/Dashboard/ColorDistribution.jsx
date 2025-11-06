import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

function ColorDistribution({ data }) {
  const colorMap = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#eab308',
    white: '#e5e7eb',
    black: '#1f2937',
    gray: '#6b7280',
    orange: '#f97316',
    purple: '#a855f7',
    brown: '#92400e',
  }

  const chartData = Object.entries(data?.color_distribution || {}).map(([color, count]) => ({
    name: color.charAt(0).toUpperCase() + color.slice(1),
    value: count,
    color: colorMap[color] || '#9ca3af',
  }))

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ColorDistribution