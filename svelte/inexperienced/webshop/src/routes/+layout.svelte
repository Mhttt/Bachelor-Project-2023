<script>
    import "./css/reset.css";
    import "./css/normalize.css";
    import "./css/global.css";

    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";
    import FreeShipping from "../components/shipping-header.svelte";
</script>

<FreeShipping />
<Header />
<slot />
<Footer />
