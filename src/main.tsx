import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { InputProvider } from "./context/InputContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <InputProvider>
    <App />
  </InputProvider>
);
