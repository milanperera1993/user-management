import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { JSX, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

const mainListItems: MenuItem[] = [
  { text: "User Management", icon: <PeopleIcon />, path: "/user-management" },
  { text: "Analytics", icon: <AnalyticsRoundedIcon />, path: "/analytics" },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const [selectedItem, setSelectedItem] = useState<MenuItem>();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = mainListItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            onClick={() => {
              navigate(item.path);
            }}
            key={index}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton selected={selectedItem === item}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
