let $navItemProducts = $('#nav-item-products');
$navItemProducts.on('click', (event) => {
    let productCategoryList = new ProductCategoryList();
    productCategoryList.getProductCatagories();
});

let $navItemOrders = $('#nav-item-shopping-cart');
$navItemOrders.on('click', () => {
    let shoppingCart = new ShoppingCart();
    shoppingCart.getShoppingCartList();
});