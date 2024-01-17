import type { ProductItemType } from "@/types";
import { API_URL } from "./consts";

export async function getProducts(limit?: number) {
    const response = await fetch(`${API_URL}/products?${limit ? "limit=" + limit : ""}`, {
        method: 'GET',
    });

    return await response.json() as ProductItemType[];
}

