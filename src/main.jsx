import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { LevelProvider } from "./contexts/levelContext.jsx";

createRoot(document.getElementById("root")).render(
  <LevelProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </LevelProvider>,
);
