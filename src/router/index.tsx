import Home from "@/views/Home";
import ImageShader from "@/views/ImageShader";
import RayMarchingShader from "@/views/RayMarchingShader";
import ThreeDShader from "@/views/ThreeDShader";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/image-shader" element={<ImageShader />} />
        <Route path="/ray-marching-shader" element={<RayMarchingShader />} />
        <Route path="/three-d-shader" element={<ThreeDShader />} />
        <Route path="*" element={<>404 - Page Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
