import { API_URL } from "./consts";

export async function getMyOrders() {
    const response = await fetch(`${API_URL}/purchases`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': localStorage.getItem('access_token'), 
            'Content-Type': 'application/json'
        }),
    })

    return await response.json()
}

export async function getOrderById(id: string) {
    const response = await fetch(`${API_URL}/purchases/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': localStorage.getItem('access_token'), 
            'Content-Type': 'application/json'
        }),
    })

    return await response.json()
}



