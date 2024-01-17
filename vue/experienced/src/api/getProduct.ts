import type { ProductItemType } from "@/types";
import { API_URL } from "./consts";

export async function getProduct(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'GET',
    })

    return await response.json() as ProductItemType;
}

