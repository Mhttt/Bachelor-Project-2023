import { API_URL } from "./consts";

interface RegisterDetails {
    email: string;
    password: string;
    username: string;
}

export async function register(data: RegisterDetails) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

