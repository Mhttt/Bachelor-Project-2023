export interface HistoryItem {
    name: string
    price: number
    product_id: string
    quantity: number
}

export interface History {
    _id: string
    items: HistoryItem[]
    purchase_date: string
    user_id: string
    image_url: string
}