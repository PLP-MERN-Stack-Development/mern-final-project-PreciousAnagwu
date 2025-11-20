import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN_HERE",
  integrations: [
    browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(<App />);
