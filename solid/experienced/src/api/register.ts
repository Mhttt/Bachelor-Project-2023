import { API_URL } from "./consts";

interface RegisterDetails {
    email: string;
    password: string;
    username: string;
}

export const regsister = async (data: RegisterDetails) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}