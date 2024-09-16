import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "./store";
import App from "./App.jsx";
import "./global.scss";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ConfigProvider theme={{ cssVar: true }}>
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
