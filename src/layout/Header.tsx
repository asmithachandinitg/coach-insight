import "./Header.css";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationCenter from "../components/NotificationCenter";

const Header = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    }

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good Evening";
    }

    return "Good Night";
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="header">
      <div className="header-left">
        <h1>{getGreeting()}👋</h1>
        <p>Track. Analyze. Transform every client's journey.</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search clients..." aria-label="Search clients" />
        </div>

        <NotificationCenter />

        <button className="icon-btn" aria-label="Account">
          <AccountCircleOutlinedIcon />
        </button>

        <div className="date-card">
          <span>{today}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;