import { Component } from "solid-js";
import CartIcon from "../icons/CartIcon";
import ProfileIcon from "../icons/ProfileIcon";

import { useNavigate } from "@solidjs/router";
import SaleHeader from "../SaleHeader/SaleHeader";
import "./Header.css";

const Header: Component = () => {
    const navigate = useNavigate();

    return (
        <>
            <SaleHeader />
            <header class="header">
                <div class="text-icon">
                    <button class="svg-button">
                        <ProfileIcon />
                    </button>
                    <p class="white-text" onClick={() => navigate("/register")}>
                        Register
                    </p>
                </div>
                <h2
                    class="white-text shop-title"
                    style="padding-right: 60px"
                    onClick={() => navigate("/")}
                >
                    WEBSHOP
                </h2>
                <div class="text-icon">
                    <button class="svg-button">
                        <CartIcon />
                    </button>
                    <p class="white-text" onClick={() => navigate("/cart")}>
                        Cart
                    </p>
                </div>
            </header>
        </>
    );
};

export default Header;
