import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import MenuButton from "./MenuButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useState } from "react";
import SideMenuMobile from "./SideMenuMobile";
import { mainListItems, MenuItem } from "./common/menu";
import { useLocation } from "react-router-dom";

const AppNavBar = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem>();

  const location = useLocation();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = mainListItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location]);
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "auto", md: "none" },
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
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mr: "auto" }}
          >
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{ color: "text.primary" }}
            >
              {selectedItem?.text}
            </Typography>
          </Stack>
          <ColorModeIconDropdown />
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default AppNavBar;
