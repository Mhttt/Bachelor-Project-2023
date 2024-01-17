import { Component, createEffect, createSignal } from 'solid-js';
import styles from './ShippingHeader.module.css';
import Cookies from 'js-cookie';

const setShippingCookie = () => {
	if (Math.random() > 0.5) {
		Cookies.set('freeShipping', 'true');
	} else {
		Cookies.set('freeShipping', 'false');
	}
};

	createEffect(() => {
		setShippingCookie();
		console.log('Shipping has been set');
	});

const ShippingHeader: Component = () => {
	return (
		<div class={styles['container']}>
			<p>CONGRATULATIONS! YOU GOT FREE SHIPPING</p>
		</div>
	);
};

export default ShippingHeader;
