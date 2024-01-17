import type ProductInterface from "./ProductInterface";

export default interface CartItem extends ProductInterface {
    quantity: number;
}