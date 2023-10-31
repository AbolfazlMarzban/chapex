export default {
    computed: {
        cartItems() {
            // return this.$store.state.cart.cartData
            return this.$store.getters['cart/getCartData']
        }
    }
}