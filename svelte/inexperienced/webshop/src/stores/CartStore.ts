import { writable } from "svelte/store";
import type CartItem from "../types/CartItem";
import type ProductInterface from "../types/ProductInterface";
import Cookies from 'js-cookie';


const createCart = () => {
    const { subscribe, set, update } = writable<CartItem[]>(Cookies.get('cart') ? JSON.parse(Cookies.get('cart') as string) : []);

    const updateCookies = (items: CartItem[]) => {
        if (items.length === 0) {
            Cookies.remove('cart')
            return
        }

        Cookies.set('cart', JSON.stringify(items), { expires: 7 })
    }


    return {
        subscribe,
        add: (product: ProductInterface) => {
            update((items) => {
                const existing = items.find((item) => item._id === product._id);

                if (existing) {
                    existing.quantity += 1;
                } else {
                    items.push({ ...product, quantity: 1 });
                }

                updateCookies(items)
                return items;
            });
        },
        remove: (id: string) => {
            update((items) => {
                let existing = items.find((item) => item._id === id);

                if (!existing) {
                    return items
                }

                if (existing.quantity === 1) {
                    items = items.filter((item) => item._id !== id);
                }
                else {
                    existing.quantity -= 1;
                }

                updateCookies(items)
                return items;
            })
        },
        clear: () => {
            update((items) => {
                items = []
                updateCookies(items)
                return items
            })
        },
    }
}

export const cart = createCart()