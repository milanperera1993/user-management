import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { User } from "../redux/features/users/usersApi";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

interface CityDistributionChartProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
];

const CityDistributionChart = (props: CityDistributionChartProps) => {
  const { users, isLoading, isError } = props;
  const cityDistribution = users.reduce(
    (acc: { [key: string]: number }, user) => {
      const city = user.city;
      if (acc[city]) {
        acc[city]++;
      } else {
        acc[city] = 1;
      }
      return acc;
    },
    {}
  );

  const data = Object.keys(cityDistribution).map((city) => ({
    name: city,
    value: cityDistribution[city],
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" align="left" gutterBottom>
        City Distribution
      </Typography>
      {isLoading && (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <CircularProgress />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Stack>
      )}
      {isError && !isLoading && (
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Error while fetching data.
        </Typography>
      )}
      {!isLoading && !isError && users && users.length > 0 && (
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default CityDistributionChart;
