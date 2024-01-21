import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import CompanyProvider from "./context/Companies/CompanyProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CompanyProvider>
        <App />
      </CompanyProvider>
    </Router>
  </React.StrictMode>
);
