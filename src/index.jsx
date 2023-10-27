import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SideBarProvider from "./context/SideBarContext";
import NavBarProvider from "./context/NavBarContext";
import StaffProvider from "./context/StaffContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StaffProvider>
    <SideBarProvider>
      <NavBarProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </NavBarProvider>
    </SideBarProvider>
  </StaffProvider>
);
