import { Box, useTheme } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DealerChartProps {
  chartData: { name: string; dealers: number }[];
}

export const DealerChart = ({ chartData }: DealerChartProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", height: "12rem" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          <XAxis
            dataKey="name"
            stroke="#b0b0b0"
            fontSize={14}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#b0b0b0"
            fontSize={14}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Bar
            dataKey="dealers"
            fill={theme.palette.error.main}
            radius={[8, 8, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DealerChart;
