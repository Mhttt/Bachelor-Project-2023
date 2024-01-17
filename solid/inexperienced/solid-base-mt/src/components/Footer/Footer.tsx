import { Component } from "solid-js";
import "./Footer.css";


const Footer: Component = () => {
  return (
		<footer>
			<p class="footer-item">Rued Langaards Vej 7, 2300 København</p>
			<div class="footer-mid-container">
				<h2 class="footer-item-webshop">WEBSHOP</h2>
				<p>The best webshop in the world</p>
			</div>
			<p class="footer-item">Made with love by Bachelor group</p>
		</footer>
	);
}

export default Footer;