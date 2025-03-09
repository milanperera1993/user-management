import { alpha, Box, CssBaseline, Stack } from "@mui/material";
import AppNavBar from "./components/AppNavBar";
import AppTheme from "./theme/AppTheme";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";

const App = () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <SideMenu/>
        <AppNavBar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default App;
