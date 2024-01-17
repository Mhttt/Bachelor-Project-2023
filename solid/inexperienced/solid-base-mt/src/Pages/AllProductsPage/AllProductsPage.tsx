import {
  Component,
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from 'solid-js';
import './AllProductsPage.css';
import { IResultItem } from '../FrontPage/FrontPage';
import Item from '../../components/Item/Item';

async function getAllProducts() {
  const baseUrl = 'http://143.42.222.62:8000';
  const response = await fetch(`${baseUrl}/products/`);

  const results = (await response.json()) as IResultItem[];
  console.log(results);

  return results;
}

const AllProductsPage: Component = () => {
  const [allProducts, setAllProducts] = createSignal<IResultItem[] | undefined>(
    []
  );
  const [filteredProducts, setFilteredProducts] = createSignal<
    IResultItem[] | undefined
  >([]);
  createEffect(() => {
    getAllProducts();
    setAllProducts(data());
    setFilteredProducts(data());
  });

  const [data] = createResource(getAllProducts);
  const filterProducts = (searchString: string) => {
    setFilteredProducts(
      allProducts()?.filter((product) =>
        product.name
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      )
    );
  };

  return (
    <Show when={!data.loading} fallback={<>Loading...</>}>
      <div class="all-products">
        <h1>ALL PRODUCTS</h1>
        <p class="product-title-description">
          A wide selection of products can be found on our webshop
        </p>

        <div class="searchfield-container">
          <input
            class="searchfield"
            type="text"
            placeholder="Search for a product"
            oninput={(e) => {
              filterProducts(e.target.value);
            }}
          />

          <svg class="svg-icon" viewBox="0 0 1024 1024" version="1.1">
            <path
              d="M398.9 735.5c-185.4 0-336.3-150.9-336.3-336.3C62.7 213.9 213.5 63 398.9 63s336.2 150.9 336.2 336.2c0.1 185.4-150.8 336.3-336.2 336.3m0-597.8c-144.2 0-261.5 117.3-261.5 261.5s117.4 261.5 261.5 261.5c144.2 0 261.5-117.3 261.5-261.5 0.1-144.2-117.3-261.5-261.5-261.5"
              fill="#C6CCDA"
            />
            <path
              d="M865.9 959.6c-23.9 0-47.8-9.1-66-27.3L540.3 672.6c-14.6-14.6-14.6-38.3 0-52.8 14.6-14.6 38.2-14.6 52.8 0l259.6 259.7c7.4 7.4 19 7.4 26.4 0 3.7-3.7 5.5-8.1 5.5-13.2s-1.9-9.5-5.5-13.2L717.9 691.8c-14.6-14.6-14.6-38.2 0-52.8 14.6-14.6 38.2-14.6 52.8 0l161.2 161.2c17.7 17.7 27.4 41.1 27.4 66s-9.7 48.3-27.4 66c-18.2 18.2-42.1 27.4-66 27.4M249.5 436.6c-20.6 0-37.3-16.7-37.3-37.4 0-103 83.8-186.8 186.8-186.8 20.6 0 37.3 16.7 37.3 37.4 0 20.6-16.7 37.3-37.3 37.3-61.8 0-112.1 50.3-112.1 112.1 0 20.6-16.8 37.4-37.4 37.4"
              fill="#C6CCDA"
            />
          </svg>
        </div>
      </div>
      <div class="outer-products-container">
        <div class="product-container">
          <For each={filteredProducts()}>
            {(item) => <Item _id={item._id} image_url={item.image_url} name={item.name} price={item.price}></Item>}
          </For>
        </div>
      </div>
    </Show>
  );
};

export default AllProductsPage;
