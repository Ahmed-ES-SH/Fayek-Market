import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Variabels_context from "./context/Variabel_conrexr.jsx";
import Firebase_provider from "./context/Firebase_Context.jsx";
import Data_context from "./context/Data_context.jsx";
import Products_control_context from "./context/Products_control.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Variabels_context>
      <Firebase_provider>
        <Products_control_context>
          <Data_context>
            <Router>
              <App />
            </Router>
          </Data_context>
        </Products_control_context>
      </Firebase_provider>
    </Variabels_context>
  </React.StrictMode>
);
