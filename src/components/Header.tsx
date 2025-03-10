import { Stack } from "@mui/material"
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown"
import NavbarBreadcrumbs from "./NavbarBreadcrumbs"
import { useEffect, useState } from "react";
import { mainListItems, MenuItem } from "./common/menu";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem>();

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = mainListItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location]);
  
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        justifyContent: "space-between",
        alignItems: { xs: 'flex-start', md: 'center' },
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs menuItems ={selectedItem} />
      <Stack direction="row">
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  )
}
export default Header