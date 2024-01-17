<template>
  <div class="footer-container">
			<p class="footer-item">Rued Langaards Vej 7, 2300 København</p>
			<div class="footer-mid-container">
				<h2 class="footer-item-webshop">WEBSHOP</h2>
				<p>The best webshop in the world</p>
			</div>
			<p class="footer-item">Made with love by Bachelor group</p>
		</div>
</template>

<style scoped>
.footer-container {
	display: flex;
	justify-content: space-between;
	position: relative;
  min-height: 90px;
  width: 100%;
  padding: 0px 30px 30px 30px;
}

.footer-mid-container {
	display: flex;
	flex-direction: column;
}

.footer-item {
	width: 200px;
  font-size: 18px;
}

.footer-item-webshop {
	align-self: center;
  font-size: 30px;
}
</style>
