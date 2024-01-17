/* @refresh reload */
import { render } from 'solid-js/web';

import '../reset.css';
import '../normalize.css';
import { Router, Route, Routes } from '@solidjs/router';
import FrontPage from './Pages/FrontPage/FrontPage';
import Header from './components/Header/Header';
import ProductPage from './Pages/ProductPage/ProductPage';
import Footer from './components/Footer/Footer';
import AllProductsPage from './Pages/AllProductsPage/AllProductsPage';
import ShippingHeader from './components/ShippingHeader/ShippingHeader';
import { createSignal } from 'solid-js';
import Cookies from 'js-cookie';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import CartPage from './Pages/CartPage/CartPage';
import LoginPage from './Pages/LoginPage/LoginPage';

const root = document.getElementById('root');

const [shipping, setShipping] = createSignal<boolean>(false);
setShipping(Cookies.get('freeShipping') === 'true');

render(
  () => (
    <>
      <Router>
        {shipping() && <ShippingHeader></ShippingHeader>}
        <Header></Header>
        <Routes>
          <Route path="/" component={FrontPage}></Route>
          <Route path="/products/:id" component={ProductPage}></Route>
          <Route path="/all-products" component={AllProductsPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </>
  ),
  root!
);
