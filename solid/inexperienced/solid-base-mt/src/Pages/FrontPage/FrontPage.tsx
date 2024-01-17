import { Component, For, Show, createEffect, createResource } from 'solid-js';
import { A } from '@solidjs/router';
import Item from '../../components/Item/Item';
import styles from './FrontPage.module.css';
import img from '../../assets/bag_image_frontpage.png';
export interface IResultItem {
  _id: string;
  name: string;
  long_description: string;
  price: number;
  short_description: string;
  image_url: string;
  quantity?: number;
}

async function getFrontPageItems() {
  const response = await fetch('http://143.42.222.62:8000/products?limit=6');

  const results = (await response.json()) as IResultItem[];

  return results;
}

const [data] = createResource(getFrontPageItems);

createEffect(() => {
  getFrontPageItems();
});

const FrontPage: Component = () => {
  return (
    <>
      <div class={styles['image-container']}>
        <img class="image" src={img} alt="frontpage image" />
      </div>
      <div class={styles['product-info']}>
        <h1>BRAND NEW PRODUCTS</h1>

        <p class={styles['product-title-description']}>A wide selection of products can be found on our webshop</p>
      </div>
      <div class={styles['outer-product-container']}>
        <div class={styles['product-container']}>
          <Show when={!data.loading} fallback={<>Loading... </>}>
            <For each={data()}>
              {(item) => <Item name={item.name} price={item.price} image_url={item.image_url} _id={item._id}></Item>}
            </For>
          </Show>
        </div>
      </div>
      <div class={styles['button-container']}>
        <a class={styles['view-all-btn']} href="/all-products">
          View All Items
        </a>
      </div>
    </>
  );
};

export default FrontPage;
