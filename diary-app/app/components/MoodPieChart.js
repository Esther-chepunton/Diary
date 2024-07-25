// app/components/MoodPieChart.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useDiary } from "../context/DiaryContext";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A3A3A3'];

const MoodPieChart = () => {
  const { entries } = useDiary();

  // Aggregate mood data
  const moodData = entries.reduce((acc, entry) => {
    const mood = entry.mood;
    if (acc[mood]) {
      acc[mood]++;
    } else {
      acc[mood] = 1;
    }
    return acc;
  }, {});

  // Prepare data for the pie chart
  const data = Object.keys(moodData).map((key, index) => ({
    name: key,
    value: moodData[key],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MoodPieChart;
