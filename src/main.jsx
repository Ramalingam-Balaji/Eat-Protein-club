
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ProteinClubAuthProvider } from "./context/ProteinClubAuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ProteinClubAuthProvider>
      <App />
    </ProteinClubAuthProvider>  
    </BrowserRouter>
  </React.StrictMode>
);