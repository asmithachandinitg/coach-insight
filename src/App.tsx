import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./layout/Layout";

import Dashboard from "./page/Dashboard";
import Clients from "./page/Clients";
import Analytics from "./page/Analytics";
import Insights from "./page/Insights";
import ClientDetails from "./page/ClientDetails";
import Finance from "./page/Finance";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#1f2937",
            color: "#fff",
            fontSize: "13px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="clients" element={<Clients />} />

          <Route path="analytics" element={<Analytics />} />

          <Route path="insights" element={<Insights />} />

          <Route path="finance" element={<Finance />} />

          <Route
            path="/clients/:id"
            element={<ClientDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;