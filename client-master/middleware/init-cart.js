
export default async function (context) {
    // context.store.dispatch('cart/initCart', context)
    context.store.dispatch('login/initCartItems', context)
}