import type { Review } from "../types/Review";
import { API_URL } from "./constants";

export async function getReviews(product: string) {
    const response = await fetch(`${API_URL}/products/reviews/${product}`, {
        method: 'GET',
    });

    return await response.json() as Review[]
}

export async function addReview(review: Omit<Review, '_id' | 'timestamp'>, token: string) {
    const response = await fetch(`${API_URL}/products/reviews/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(review)
    });

    return await response.json();
}