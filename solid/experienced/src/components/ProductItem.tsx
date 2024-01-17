import { Component } from "solid-js";

import styles from "./ProductItem.module.css";
import { Product } from "../types/Product";
import { useNavigate } from "@solidjs/router";

interface Props {
    product: Product;
}

const ProductItem: Component<Props> = ({
    product: { name, _id, image_url, price },
}) => {
    const navigate = useNavigate();

    return (
        <div class={styles.product}>
            <img src={image_url} alt="product image" class={styles.image} />
            <button onClick={() => navigate(`/products/${_id}`)}>
                View item
            </button>
            <p class={styles.name}>{name}</p>
            <p class={styles.price}>{price} USD</p>
        </div>
    );
};

export default ProductItem;
