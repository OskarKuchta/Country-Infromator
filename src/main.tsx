import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { InputProvider } from "./context/InputContext";
import { CountryProvider } from "./context/CountryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <InputProvider>
    <CountryProvider>
      <App />
    </CountryProvider>
  </InputProvider>
);
