import { Product } from "../types/Product";
import { API_URL } from "./consts";


export const getProduct = async (id: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
}