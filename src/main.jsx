import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "./store";
import App from "./App.jsx";
import "./global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={{ cssVar: true }}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
