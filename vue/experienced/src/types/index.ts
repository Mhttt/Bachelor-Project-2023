export interface ProductItemType {
    _id: string
    name: string
    long_description: string
    short_description: string
    price: number
    image_url: string
}

export interface ReviewType {
    comment: String
    rating: Number
    rater: String
}

export interface CartItemType {
    _id: String
    bagName: String
    quantity: Number
    price: Number
    imageUrl: String
}





  