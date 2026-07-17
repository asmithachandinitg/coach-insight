import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";

import "./Sidebar.css";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    name: "Clients",
    path: "/clients",
    icon: <GroupsIcon />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <AnalyticsIcon />,
  },
  {
    name: "Insights",
    path: "/insights",
    icon: <LightbulbIcon />,
  },
  {
    name: "Revenue & Payments",
    path: "/finance",
    icon: <SettingsIcon />,
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>CoachInsight</h2>
        <p>Fitness Intelligence</p>
      </div>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;