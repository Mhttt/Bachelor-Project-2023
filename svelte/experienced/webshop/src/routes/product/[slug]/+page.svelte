<script lang="ts">
	import Cookies from 'js-cookie';
	import Footer from '../../../components/Footer.svelte';
	import Header from '../../../components/Header.svelte';
  import {loggedInUser} from '../../../stores';

	export let data;
  const apiURL = 'http://143.42.222.62:8000';
  let user: string;
  loggedInUser.subscribe(userName => {
    user = userName
  })

  interface cartItem {
  productId: string;
  quantity: number;
}

  let review = {
    comment: '',
    product_id: data.product_id,
    rating: 0,
  }

  function addProductToCart() {
    let cart = JSON.parse(Cookies.get('cart') || '[]');
  let found = false;
  if (cart.length === 0) {
    cart.push({ productId: data.product_id, quantity: 1 });
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
    alert('Added to cart');
    console.log(Cookies.get('cart'))
  } else {
    cart.forEach((item: cartItem) => {
      if (item.productId === data.product_id) {
        item.quantity += 1;
        found = true;
        alert('Added to cart');
        console.log(Cookies.get('cart'))
      }
    });
    if (!found) {
      cart.push({ productId: data.product_id, quantity: 1 });
      alert('Added to cart');
      console.log(Cookies.get('cart'))
    }
    Cookies.set('cart', JSON.stringify(cart), {
      expires: 7,
    });
  }
  }


  async function submitReview() {
    if(user !== 'Register') {
      await fetch(`${apiURL}/products/reviews/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}` ?? ''
        },
        body: JSON.stringify(review)
      })
      location.reload()
      return alert('Successfully submitted review!')
    }
    return alert('Please login in order to submit a review')
  }
</script>

<Header />
<main>
	<!-- Product Information -->
	<div class="product">
		<div class="product-image">
			<img src={data.product.image_url} alt="Product" />
		</div>

		<div class="product-info">
			<h3>{data.product.name}</h3>
			<p>{data.product.short_description}</p>

			<h2>{data.product.price} USD</h2>
			<button on:click={addProductToCart} class="product-item-buttons">Add to Cart</button>

			<h4>Description</h4>
			<p>
				{data.product.long_description}
			</p>
		</div>
	</div>
  <h1>Product Reviews</h1>
            <div class="reviews">
              {#each data.reviews as review}
                <div class="review">
                    <div class="stars">
                      {#each Array.apply(null, Array(review.rating)).map(function () {}) as stars}
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                class="star"
                                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                            />
                        </svg>
                        {/each}
                    </div>
                    <p>
                        {review.comment}
                    </p>
                </div>
                {/each}
            </div>
            <!-- Leave a review -->
            <h1>Leave a Review</h1>

            <section class="user-input">
                <select bind:value={review.rating} class="input-stars">
                    <option value="">-- Please choose an option --</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>

                <textarea
                    class="input-feedback"
                    placeholder="Write what you think about the product"
                    bind:value={review.comment}
                ></textarea>

                <button class="product-item-buttons" on:click={submitReview}>Submit Review</button>
            </section>
        </main>
<Footer />

<style>
	main {
		margin-top: 100px;
		margin-bottom: 100px;
		margin-left: auto;
		margin-right: auto;
	}

	main > h1 {
		margin-top: 16px;
		margin-bottom: 8px;
		font-weight: unset;
	}

	img {
		width: 650px;
		height: 650px;
	}

	/* Product Information */
	.product {
		display: flex;
		flex-direction: row;
		gap: 40px;
		justify-content: center;
	}

	.product-info {
		flex-grow: 0;
		width: 350px;
	}

	.product-image {
		flex-grow: 0;
		flex-shrink: 0;
	}

	.product-info > h3 {
		font-size: 32px;
	}

	.product-info > h2 {
		font-size: 40px;
		font-weight: unset;
	}

	.product-info > h4 {
		margin-bottom: 8px;
	}

	.product-item-buttons {
		width: 350px;
		height: 40px;
		border: none;
		background-color: #1f1f1f;
		color: white;
		cursor: pointer;

		margin-top: 16px;
		margin-bottom: 16px;
	}

	.product-item-buttons:hover {
		background-color: #2f2f2f;
	}

	/* Review */
	.reviews {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.review {
		padding: 32px;
		background-color: #fbfbfb;
	}

	.stars {
		display: flex;
		flex-direction: row;
		gap: 4px;
		margin-bottom: 8px;
	}

	.star {
		fill: #616161;
	}

	.user-input {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 56px;
	}

	.user-input > select {
		height: 50px;
		width: 300px;
		background-color: #fbfbfb;
		border: none;
		padding-left: 16px;
	}

	.user-input > select:focus {
		outline: none;
	}

	.user-input > textarea {
		border: none;
		resize: none;
		background-color: #fbfbfb;
		padding: 16px;
	}

	.user-input > textarea:focus {
		outline: none;
	}

	.user-input > button {
		margin-top: 8px;
		width: 200px;
	}
</style>
