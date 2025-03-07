import { Box, Paper, Stack } from "@mui/material";
import DataGrid from "./DataGrid";
import { useFetchAllUsersQuery } from "../redux/features/users/usersApi";
import CityDistributionChart from "./CityDistributionChart";
import AgeDistributionChart from "./AgeDistributionChart";

const MainGrid = () => {
  // TODO: need to handle isLoading and, isError
  const {data : users =[] , isLoading, isError } =useFetchAllUsersQuery();
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexGrow: 1,
        overflow: "auto",
        mt: { xs: 8, md: 8 },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          p={3}
          width="100%"
          sx={{ flexGrow: 1 }}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{ flex: { xs: 1, md: 2 } }}
          >
            <Paper
              sx={{
                height: "100%",
                flexGrow: 1,
                minHeight: { xs: 750, md: "100%" },
                p: 2
              }}
            >
              <DataGrid users={users} isLoading={isLoading} isError ={isError}/>
            </Paper>
          </Box>

          {/* TODO: add charts */}
          <Box
            display="flex"
            gap={3}
            sx={{
              flex: 1,
              flexDirection: { xs: "column", sm: "row", md: "column" },
            }}
          >
            <Paper sx={{ height: "100%", flexGrow: 1, minHeight: 300 }}>
             <CityDistributionChart isError={isError} isLoading={isLoading} users={users} />
            </Paper>
            <Paper sx={{ height: "100%", flexGrow: 1, minHeight: 300 }}>
              <AgeDistributionChart isError={isError}  isLoading={isLoading} users={users} />
            </Paper>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default MainGrid;
