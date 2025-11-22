// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./context/WalletContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
