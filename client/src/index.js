import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/GameFeed.css";
import "./styles/IntroPage.css";
import "./styles/LoadingPage.css";
import { initializeUserConfig } from "./config";

async function main() {
  await initializeUserConfig();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

main();