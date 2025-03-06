import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";

const AppNavBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { ml: "auto" },
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", mr: "auto" }}
        >
          {/* <NavbarBreadcrumbs /> */}
          {/* replace the text with bread crumbs if thats needed */}
          <Typography
            variant="subtitle2"
            component="h1"
            sx={{ color: "text.primary" }}
          >
            Data Grid
          </Typography>
        </Stack>
        <ColorModeIconDropdown />
      </Toolbar>
    </AppBar>
  );
};
export default AppNavBar;
