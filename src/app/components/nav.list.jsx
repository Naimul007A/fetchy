import { Home } from "lucide-react";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { tools } from "./tool.list";

export const navItems = () => {
  return [
    {
      title: "Home",
      url: "/",
      icon: Home,
      subItems: [],
    },
    {
      title: "Tools",
      icon: HomeRepairServiceIcon,
      subItems: tools(),
    },
  ];
}