"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Legend,
} from "recharts"

interface ChartProps {
  data: any[]
  className?: string
}

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"]

export function BarChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
          cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
        />
        <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart({
  data,
  xAxisKey = "name",
  yAxisKey = "value",
  className,
}: ChartProps & { xAxisKey?: string; yAxisKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={data}>
        <XAxis dataKey={xAxisKey} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
          cursor={{ stroke: "#8b5cf6", strokeWidth: 1 }}
        />
        <Line type="monotone" dataKey={yAxisKey} stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function PieChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
