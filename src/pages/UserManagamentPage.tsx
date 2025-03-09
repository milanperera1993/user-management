import { Box, Paper, Stack } from "@mui/material";
import { useFetchAllUsersQuery } from "../redux/features/users/usersApi";
import DataGrid from "../components/DataGrid/DataGrid";

const UserManagamentPage = () => {
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
          width="100%"
          sx={{ flexGrow: 1 }}
        >
            <Paper
              sx={{
                height: "100%",
                flexGrow: 1,
                minHeight: { md: "100%" },
                p: 2
              }}
            >
              <DataGrid users={users} isLoading={isLoading} isError ={isError}/>
            </Paper>
          </Box>
      </Stack>
    </Box>
  );
};
export default UserManagamentPage;
