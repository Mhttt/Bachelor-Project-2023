import { useParams } from "@solidjs/router";
import { Component, createResource } from "solid-js";
import { getProduct } from "../../api/getProduct";
import styles from "./ViewProduct.module.css";

const ViewProduct: Component = () => {
    const params = useParams();

    const [product] = createResource(async () => {
        return await getProduct(params.id);
    });

    return (
        <main class={styles.main}>
            <div class={styles.product}>
                <div class={styles["product-image"]}>
                    <img
                        src={product()?.image_url}
                        class={styles.image}
                        alt="Product Image"
                    />
                </div>

                <div class={styles["product-info"]}>
                    <h3 class={styles.header}>{product()?.name}</h3>
                    <p class={styles["short-desc"]}>
                        {product()?.short_description}
                    </p>

                    <h2>{product()?.price} USD</h2>
                    <button class={styles["product-item-buttons"]}>
                        Add to Cart
                    </button>

                    <h4 class={styles["long-desc-title"]}>Description</h4>
                    <p>{product()?.long_description}</p>
                </div>
            </div>
        </main>
    );
};

export default ViewProduct;
