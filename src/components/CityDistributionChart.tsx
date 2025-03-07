import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { User } from "../redux/features/users/usersApi";
import { Box, Typography } from "@mui/material";

interface CityDistributionChartProps {
  users: User[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56"];

const CityDistributionChart = ({ users }: CityDistributionChartProps) => {
  const cityDistribution = users.reduce((acc: { [key: string]: number }, user) => {
    const city = user.city;
    if (acc[city]) {
      acc[city]++;
    } else {
      acc[city] = 1;
    }
    return acc;
  }, {});

  const data = Object.keys(cityDistribution).map((city) => ({
    name: city,
    value: cityDistribution[city],
  }));

  return (
    <Box sx={{p:2}}>
      <Typography variant="subtitle1" align="left" gutterBottom>
        City Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            legendType="line"
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CityDistributionChart;