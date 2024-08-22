import Home from "@/views/Home";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<>404 - Page Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
