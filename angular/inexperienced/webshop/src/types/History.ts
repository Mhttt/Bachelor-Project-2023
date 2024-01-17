export interface HistoryItem {
    price: number;
    quantity: number;
    product_id: string;
}

export interface History {
    _id: string;
    user_id: string;
    items: HistoryItem[];
    purchase_date: string;
    image_url: string;
}