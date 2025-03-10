import { JSX } from "react";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

export interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

export const mainListItems: MenuItem[] = [
  { text: "User Management", icon: <PeopleIcon />, path: "/user-management" },
  { text: "Analytics", icon: <AnalyticsRoundedIcon />, path: "/analytics" },
];
