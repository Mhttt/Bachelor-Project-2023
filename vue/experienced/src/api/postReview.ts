import { API_URL } from "./consts";

export async function postReview(review: {comment: string, rating: number, product_id: string}) {

    const response = await fetch(`${API_URL}/products/reviews/add`, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: new Headers({
            'Authorization': localStorage.getItem('access_token'), 
            'Content-Type': 'application/json'
        }),
    })

    return await response.json();
}

