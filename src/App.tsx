import { BrowserRouter, Routes, Route } from "react-router-dom";

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