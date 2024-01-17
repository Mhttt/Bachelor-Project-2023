import type { Component } from "solid-js";

import "./assets/styles/normalize.css";
import "./assets/styles/reset.css";

import { Route, Routes } from "@solidjs/router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AllProducts from "./pages/all-products/AllProducts";
import FrontPage from "./pages/frontpage/FrontPage";

import "./App.css";
import Register from "./pages/register/Register";
import ViewProduct from "./pages/view-product/ViewProduct";

const App: Component = () => {
    return (
        <>
            <div class="main">
                <Header />
                <div class="main-item">
                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/products" element={<AllProducts />} />
                        <Route path="/products/:id" element={<ViewProduct />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default App;
