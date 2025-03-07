import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { User } from "../redux/features/users/usersApi";
import { Box, Typography } from "@mui/material";

interface AgeDistributionChartProps {
  users: User[];
}

const AgeDistributionChart = ({ users }: AgeDistributionChartProps) => {
  const ageDistribution = users.reduce((acc: { [key: string]: number }, user) => {
    const age = user.age.toString();
    if (acc[age]) {
      acc[age]++;
    } else {
      acc[age] = 1;
    }
    return acc;
  }, {});

  const data = Object.keys(ageDistribution).map((age) => ({
    name: age,
    count: ageDistribution[age],
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" align="left" gutterBottom>
        Age Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Ages', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AgeDistributionChart;