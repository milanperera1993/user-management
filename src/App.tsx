import { Box, CssBaseline } from "@mui/material";
import AppNavBar from "./components/AppNavBar";
import AppTheme from "./theme/AppTheme";
import MainGrid from "./components/MainGrid";

const App = () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppNavBar />
        <MainGrid />
      </Box>
    </AppTheme>
  );
};

export default App;
