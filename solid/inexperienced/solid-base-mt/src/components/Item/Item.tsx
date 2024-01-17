import './Item.css';

interface ItemProps {
  _id: string;
  name: string;
  price: number;
  image_url: string;
}

const baseUrl = '/products/';

function Item(props: ItemProps) {
  return (
    <div class="product">
      <img width="280" height="300" src={props.image_url} alt={props.name} />
      <a class="product-container-button" href={baseUrl + props._id}>
        View item
      </a>
      <p class="product-description">{props.name}</p>
      <p class="product-price">{props.price} USD</p>
    </div>
  );
}

export default Item;
