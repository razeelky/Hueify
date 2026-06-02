import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </Router>
    </StrictMode>
  );
}
