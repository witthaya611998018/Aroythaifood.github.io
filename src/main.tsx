// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom";
// import React from "react";
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//   <React.StrictMode>
//     <BrowserRouter basename={import.meta.env.BASE_URL}>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
