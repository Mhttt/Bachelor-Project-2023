import { API_URL } from "./constants";
import type LoginForm from "../types/LoginFormInterface";


export async function login(form: LoginForm) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}