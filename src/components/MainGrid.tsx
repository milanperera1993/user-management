import { Box, Paper, Stack } from "@mui/material";
import DataGrid from "./DataGrid";

const MainGrid = () => {
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
              }}
            >
              <DataGrid />
            </Paper>
          </Box>

          <Box
            display="flex"
            gap={3}
            sx={{
              flex: 1,
              flexDirection: { xs: "column", sm: "row", md: "column" },
            }}
          >
            <Paper sx={{ height: "100%", flexGrow: 1, minHeight: 300 }}>
              Chart 1
            </Paper>
            <Paper sx={{ height: "100%", flexGrow: 1, minHeight: 300 }}>
              Chart 2
            </Paper>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default MainGrid;
