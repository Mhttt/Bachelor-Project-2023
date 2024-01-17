import type { Product, Review } from '../../+page.svelte';

export const load = async ({ fetch, params }) => {
	const apiURL = 'http://143.42.222.62:8000';

	async function getProduct(): Promise<Product> {
		const res = await fetch(`${apiURL}/products/${params.slug}`);
		const json = await res.json();
		return json;
	}

  async function getReviews(): Promise<Review[]> {
    const res = await fetch(`${apiURL}/products/reviews/${params.slug}`);
		const json = await res.json();
		return json;
  }

	return {
		product: await getProduct(),
    reviews: await getReviews(),
    product_id: params.slug
	};
};
