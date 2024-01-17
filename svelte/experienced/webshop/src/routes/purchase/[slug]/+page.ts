import type { ProductInfo } from '../../+page.svelte';
import Cookies from 'js-cookie';

export const load = async ({ fetch, params }) => {
	const apiURL = 'http://143.42.222.62:8000';

  interface HistoryOrder {
    _id: string;
    user_id: string;
    image_url: string;
    items: ProductInfo[];
    purchase_date: string;
  }

	async function getPurchase(): Promise<HistoryOrder> {
		const res = await fetch(`${apiURL}/purchases/${params.slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}` ?? ''
			}
		});
		const json = await res.json();
    console.log(json)
		return json;
	}


	return {
		purchase: await getPurchase(),
		product_id: params.slug
	};
};
