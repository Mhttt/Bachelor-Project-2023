<script lang="ts">
	import Footer from '../../../components/Footer.svelte';
	import Header from '../../../components/Header.svelte';

	export let data;
  
</script>

<Header />
<div class="container">
            <div class="title-and-description">
                <h2>HISTORY - ORDER #{data.product_id}</h2>
                <p>
                    List of all items purchased on January 27th with order ID
                    #{data.product_id}.
                </p>
            </div>
            <div class="outer-item-container">
                <a href="/purchases">Go back</a>
                <div class="item-container">
                    <div class="item-info">
                        <img
                            class="product-image"
                            src={data.purchase.image_url}
                            alt="bag"
                        />
                        <div class="title-and-price-container">
                            <p>The classic bag x2</p>
                            <p class="product-price">799 USD</p>
                        </div>
                    </div>
                </div>
                <p>TOTAL 1797 USD</p>
            </div>
</div>
<Footer />

<style>
	.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-bottom: 30px;
}

.title-and-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
}

.title-and-description h2 {
    align-self: center;
}

.outer-item-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.outer-item-container a {
    background-color: black;
    color: white;
    border-radius: 5px;
    border-style: none;
    padding: 8px 24px 8px 24px;
    max-width: 20%;
}

.item-container {
    display: flex;
    background-color: rgb(235, 230, 230);
    border-radius: 3px;
    justify-content: space-between;
    width: 1000px;
}

.item-info {
    display: flex;
}

.product-image {
    width: 100px;
    padding: 24px;
}

.title-and-price-container {
    align-self: center;
}


</style>
