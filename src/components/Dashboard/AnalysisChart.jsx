import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function AnalysisChart({ data, title }) {
  const chartData = data?.timeline_data || []

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatTime}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            labelFormatter={(value) => `Time: ${formatTime(value)}`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar 
            dataKey="vehicles" 
            fill="#3b82f6" 
            name="Vehicles"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="persons" 
            fill="#10b981" 
            name="Persons"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AnalysisChart