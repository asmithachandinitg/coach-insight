import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Header />

        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;