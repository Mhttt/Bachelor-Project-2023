import type { ReviewType } from "@/types";
import { API_URL } from "./consts";

export async function getReviews(id: string) {
    const response = await fetch(`${API_URL}/products/reviews/${id}`, {
        method: 'GET',
    })

    return await response.json() as ReviewType[];
}

