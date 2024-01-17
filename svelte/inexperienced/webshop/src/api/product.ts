import type ProductInterface from "../types/ProductInterface";
import { API_URL } from "./constants";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
    });

    return await response.json() as ProductInterface[];
}

export async function getProduct(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'GET',
    });

    return await response.json() as ProductInterface;
}


