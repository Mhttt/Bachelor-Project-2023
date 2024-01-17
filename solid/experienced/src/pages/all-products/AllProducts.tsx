import {
    Component,
    For,
    JSX,
    Show,
    createResource,
    createSignal,
} from "solid-js";

import { getProducts } from "../../api/getProducts";
import ProductItem from "../../components/ProductItem";
import SearchIcon from "../../components/icons/SearchIcon";
import styles from "./AllProducs.module.css";

const AllProducts: Component = () => {
    const [search, setSearch] = createSignal("");

    const [products] = createResource(async () => {
        return await getProducts();
    });

    const handleChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (
        e
    ) => {
        setSearch(e.currentTarget.value.toLowerCase());
    };

    return (
        <main class={styles.main}>
            <div class={styles["all-products"]}>
                <h1>ALL PRODUCTS</h1>
                <p class={styles["product-title-description"]}>
                    A wide selection of products can be found on our webshop
                </p>

                <div class={styles["searchfield-container"]}>
                    <input
                        onInput={handleChange}
                        class={styles["searchfield"]}
                        type="text"
                        value={search()}
                        placeholder="Search for a product"
                    />

                    <SearchIcon />
                </div>
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
                        {(product) => (
                            <Show
                                when={product.name
                                    .toLowerCase()
                                    .includes(search())}
                            >
                                <ProductItem product={product} />
                            </Show>
                        )}
                    </For>
                </div>
            </Show>
        </main>
    );
};

export default AllProducts;
