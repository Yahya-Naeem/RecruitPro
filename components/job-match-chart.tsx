"use client"

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface JobMatchChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
  title?: string
  description?: string
  className?: string
  jobTitle?: string
}

export function JobMatchChart({
  data,
  title = "Candidate Match Quality",
  description = "Distribution of candidates by match quality",
  className = "",
  jobTitle,
}: JobMatchChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{jobTitle ? `${description} for ${jobTitle}` : description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} candidates`, "Count"]}
                contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
