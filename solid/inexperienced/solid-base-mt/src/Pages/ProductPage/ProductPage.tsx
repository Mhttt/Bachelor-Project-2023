import { Component, For, Show, createEffect, createResource, createSignal } from 'solid-js';
import styles from './ProductPage.module.css';
import { IResultItem } from '../FrontPage/FrontPage';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

interface ReviewData {
  _id: string;
  comment: string;
  product_id: string;
  rating: number;
  rater: string;
  timestamp: Date;
}

const getProductId = () => {
  const url = window.location.href;
  const id = url.split('/').pop();
  return id;
};

async function getProduct() {
  const baseUrl = 'http://143.42.222.62:8000';
  const response = await fetch(`${baseUrl}/products/${getProductId()}`);

  const results = (await response.json()) as IResultItem;

  return results;
}

async function getReviews() {
  const baseUrl = 'http://143.42.222.62:8000';
  const response = await fetch(`${baseUrl}/products/reviews/${getProductId()}`);

  const results = (await response.json()) as ReviewData[];
  return results;
}

function isUserLoggedIn() {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    const decode = jwtDecode<{ sub: string }>(accessToken);

    if (decode && decode.sub) {
      return true;
    }
    return false;
  }
}

async function addToCart(product: IResultItem) {
  const productId = getProductId();
  const cartCookie = Cookies.get('cart');

  if (cartCookie) {
    const cart: [IResultItem] = JSON.parse(cartCookie);
    const itemIndex = cart.findIndex((v, i) => v._id === product._id);

    if (itemIndex !== -1) {
      // Found
      if (cart[itemIndex].quantity) {
        cart[itemIndex].quantity! += 1;
        Cookies.set('cart', JSON.stringify(cart));
        return alert('Successfully added to cart');
      } else {
        // it has no quantity, just add one
        cart.push({ ...product, quantity: 1 });
        Cookies.set('cart', JSON.stringify(cart));
        return alert('Successfully added to cart');
      }
    } else {
      cart.push({ ...product, quantity: 1 });
      Cookies.set('cart', JSON.stringify(cart));
      return alert('Successfully added to cart');
    }
  } else {
    // Create Cart cookie
    Cookies.set('cart', JSON.stringify([{ ...product, quantity: 1 }]));
    return alert('Successfully added to cart!');
  }
}

const ProductPage: Component = () => {
  const [data] = createResource(getProduct);
  const [reviews] = createResource(getReviews);

  const [reviewData, setReviewData] = createSignal({
    stars: 0,
    review: '',
  });

  createEffect(async () => {
    getProduct();

    if (isUserLoggedIn()) {
      getReviews();
    }
  });

  async function submitReview() {
    if (isUserLoggedIn()) {
      if (reviewData().review && reviewData().stars > 0) {
        const r = await fetch('http://143.42.222.62:8000/products/reviews/add', {
          method: 'POST',
          body: JSON.stringify({
            comment: reviewData().review,
            rating: reviewData().stars,
            product_id: getProductId(),
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        const json = await r.json();

        if (json && json.detail) {
          return alert(`Error: ${json.detail}`);
        }
        if (json && json._id) {
          return alert('Successfully added review!');
        }
      }
      return alert('You must fill out all fields');
    }
    return alert('Not logged in!');
  }

  return (
    <Show when={!data.loading} fallback={<>Loading...</>}>
      <div class={styles['product']}>
        <div class={styles['product-image']}>
          <img class={styles['image']} src={data()?.image_url} alt="Product Image" />
        </div>

        <div class={styles['product-info']}>
          <h3>{data()?.name}</h3>
          <p>{data()?.short_description}</p>

          <h2>{data()?.price} USD</h2>
          <button
            onClick={() => (data() !== undefined ? addToCart(data()!) : alert('No item to add to cart'))}
            class={styles['product-item-buttons']}
          >
            Add to Cart
          </button>

          <h4>Description</h4>
          <p>{data()?.long_description}</p>
        </div>
      </div>

      {isUserLoggedIn() && (
        <>
          <div class={styles['reviews']}>
            <h1>Product Reviews</h1>
            {reviews() &&
              reviews()?.map((v, i) => {
                return (
                  <div class={styles['review']}>
                    <div class={styles['stars']}>
                      <For each={[1, 2, 3, 4]}>
                        {(cat, i) => (
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              class={styles['star']}
                              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                            />
                          </svg>
                        )}
                      </For>
                    </div>

                    <p>
                      “{v.comment}” - {v.rater}
                    </p>
                  </div>
                );
              })}
          </div>

          <div class={styles['leave-review']}>
            <h1>Leave a Review</h1>

            <section class={styles['user-input']}>
              <select
                onChange={(e) => setReviewData({ ...reviewData(), stars: parseInt(e.target.value) })}
                class={styles['input-stars']}
              >
                <option value="0">-- Please choose an option --</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>

              <textarea
                class={styles['input-feedback']}
                placeholder="Write what you think about the product"
                onChange={(e) => setReviewData({ ...reviewData(), review: e.target.value })}
              ></textarea>

              <button onClick={() => submitReview()} class={styles['product-item-buttons']}>
                Submit Review
              </button>
            </section>
          </div>
        </>
      )}
    </Show>
  );
};

export default ProductPage;
