import { Box, Paper } from "@mui/material";
import { useFetchAllUsersQuery } from "../redux/features/users/usersApi";
import CityDistributionChart from "../components/CityDistributionChart";
import AgeDistributionChart from "../components/AgeDistributionChart";

const UserAnalyticsPage = () => {
  const { data: users = [], isLoading, isError } = useFetchAllUsersQuery();
  return(
    <Box
    display="flex"
    gap={2}
    sx={{
      flex: 1,
      flexDirection: "column",
    }}
  >
    <Paper sx={{ height: "100%", flexGrow: 1}}>
      <CityDistributionChart
        isError={isError}
        isLoading={isLoading}
        users={users}
      />
    </Paper>
    <Paper sx={{ height: "100%", flexGrow: 1 }}>
      <AgeDistributionChart
        isError={isError}
        isLoading={isLoading}
        users={users}
      />
    </Paper>
  </Box>
  )
};
export default UserAnalyticsPage;
