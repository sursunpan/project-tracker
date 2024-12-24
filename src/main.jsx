import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Toaster />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
