import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddUpdate from "./components/AddUpdate";
import HomePage from "./components/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/update/:id" element={<AddUpdate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
