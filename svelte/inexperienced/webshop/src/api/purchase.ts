import { API_URL } from "./constants";
import type CartItem from "../types/CartItem";
import type { History } from "../types/History";

export async function purchase(items: CartItem[], token: string) {
    return await fetch(`${API_URL}/purchase`, {
        method: 'POST',
        body: JSON.stringify({ items: items.map(item => ({ product_id: item._id, quantity: item.quantity })) }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getPurchases(token: string): Promise<History[]> {
    const response = await fetch(`${API_URL}/purchases`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function getPurchase(purchaseId: string, token: string): Promise<History> {
    const response = await fetch(`${API_URL}/purchases/${purchaseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return await response.json();
}