import { useNavigate } from "@solidjs/router";
import { Component, For, Show, createResource } from "solid-js";
import { getProducts } from "../../api/getProducts";
import HeroImage from "../../assets/bag_image_frontpage.png";
import ProductItem from "../../components/ProductItem";
import styles from "./FrontPage.module.css";

const FrontPage: Component = () => {
    const navigate = useNavigate();

    const [products] = createResource(async () => {
        return await getProducts(6);
    });

    return (
        <main class={styles.main}>
            <div class={styles["image-container"]}>
                <img
                    class={styles["image"]}
                    src={HeroImage}
                    alt="frontpage image"
                />
            </div>

            <div class={styles["product-info"]}>
                <h1>BRAND NEW PRODUCTS</h1>

                <p class={styles["product-title-description"]}>
                    A wide selection of products can be found on our webshop
                </p>
            </div>

            <Show when={products.loading}>
                <h1>Loading...</h1>
            </Show>

            <Show when={products.error}>
                <h1>Products could not be retrieved, try refreshing</h1>
            </Show>

            <Show when={products()?.length}>
                <div class={styles["product-container"]}>
                    <For each={products()}>
                        {(product) => <ProductItem product={product} />}
                    </For>
                </div>
            </Show>

            <button
                onClick={() => navigate("/products")}
                class={styles["view-all-btn"]}
            >
                View All Items
            </button>
        </main>
    );
};

export default FrontPage;
