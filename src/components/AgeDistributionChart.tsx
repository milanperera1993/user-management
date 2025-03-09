import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { User } from "../redux/features/users/usersApi";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { brand } from "../theme/themePrimitives";

interface AgeDistributionChartProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}

const AgeDistributionChart = (props: AgeDistributionChartProps) => {
  const { users, isLoading, isError } = props;
  const ageDistribution = users.reduce(
    (acc: { [key: string]: number }, user) => {
      const age = user.age.toString();
      if (acc[age]) {
        acc[age]++;
      } else {
        acc[age] = 1;
      }
      return acc;
    },
    {}
  );

  const data = Object.keys(ageDistribution).map((age) => ({
    name: age,
    count: ageDistribution[age],
  }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" align="left" gutterBottom>
        Age Distribution
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
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "Ages",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={brand[600]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default AgeDistributionChart;
