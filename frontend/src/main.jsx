import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import "./styles/globals.css";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import { ScrollProvider } from "./context/ScrollContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <SmoothScrollProvider>
      <ScrollProvider>
        <RouterProvider router={router} />
      </ScrollProvider>
    </SmoothScrollProvider>,
);
