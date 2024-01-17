import Cookies from "js-cookie";
import { Component, Show, createEffect, createSignal } from "solid-js";
import styles from "./SaleHeader.module.css";

const SaleHeader: Component = () => {
    const [isSale, setIsSale] = createSignal(false);

    createEffect(() => {
        if (!Cookies.get("freeshipping")) {
            Cookies.set("freeshipping", Math.floor(Math.random() * 2) === 0);
        }

        setIsSale(Cookies.get("freeshipping") === "true");
    });

    return (
        <Show when={isSale()}>
            <header class={styles.container}>
                <h2 class={styles.text}>
                    CONGRATULATIONS! YOU GOT FREE SHIPPING.
                </h2>
            </header>
        </Show>
    );
};

export default SaleHeader;
