import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/home.page";
import PropertyPage from "./pages/property.page";
import RootLayout from "./layouts/root.layout";
import AboutPage from "./pages/about.page";

// import Footer from "./components/Footer";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </StrictMode>
);
