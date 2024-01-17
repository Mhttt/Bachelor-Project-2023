import { API_URL } from "./constants";
import type RegisterForm from "../types/RegisterFormInterface";


export async function register(form: RegisterForm) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}