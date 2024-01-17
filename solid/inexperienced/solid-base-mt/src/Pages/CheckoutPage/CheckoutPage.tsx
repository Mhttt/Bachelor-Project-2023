import { Component } from 'solid-js';
import styles from './CartPage.module.css';

const CheckoutPage: Component = () => {
  return (
    <div class="container">
      <div class="title-and-description">
        <h2>HISTORY</h2>
        <p>Track your order history and view your latest purchases</p>
      </div>
      <div class="outer-item-container">
        <div class="item-container">
          <div class="item-info">
            <img class="product-image" src="guccibag.png" alt="bag" />
            <div class="title-and-price-container">
              <p>Order #312837</p>
              <p class="product-price">January 27th, 2023</p>
            </div>
          </div>
          <div class="price-order-container">
            <h3>$ 125 USD</h3>
            <button class="test">View Order</button>
          </div>
        </div>
        <div class="item-container">
          <div class="item-info">
            <img class="product-image" src="guccibag.png" alt="bag" />
            <div class="title-and-price-container">
              <p>Order #138333</p>
              <p class="product-price">May 2nd, 2023</p>
            </div>
          </div>
          <div class="price-order-container">
            <h3>$ 491 USD</h3>
            <button class="test">View Order</button>
          </div>
        </div>
        <div class="item-container">
          <div class="item-info">
            <img class="product-image" src="guccibag.png" alt="bag" />
            <div class="title-and-price-container">
              <p>Order #649184</p>
              <p class="product-price">December 15th, 2023</p>
            </div>
          </div>
          <div class="price-order-container">
            <h3>$ 3381 USD</h3>
            <button class="test">View Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
