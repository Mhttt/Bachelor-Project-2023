import { API_URL } from "./consts";

interface LoginDetails {
    password: string;
    username: string;
}

export async function login(data: LoginDetails) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

