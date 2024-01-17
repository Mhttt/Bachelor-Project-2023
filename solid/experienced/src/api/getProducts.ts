import { Product } from "../types/Product";
import { API_URL } from "./consts";


export const getProducts = async (limit?: number): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products${limit ? "?limit=" + limit : ""}`);
    return await response.json();
}