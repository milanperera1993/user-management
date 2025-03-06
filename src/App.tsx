import { Box, CssBaseline, Paper, Stack } from "@mui/material";
import AppNavBar from "./components/AppNavBar";
import AppTheme from "./theme/AppTheme";

const App = () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <AppNavBar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 8 },
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap={3}
              p={3}
              width="100%"
            >
              <Box
                display="flex"
                flexDirection="column"
                sx={{ flex: { xs: 1, md: 2 } }}
              >
                <Paper sx={{ height: "100%", flexGrow: 1, minHeight: 700 }}>
                  Data grid
                </Paper>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                sx={{ flex: 1 }}
              >
                <Paper sx={{ height: 400 }}>Chart 1</Paper>
                <Paper sx={{ height: 400 }}>Chart 2</Paper>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default App;
