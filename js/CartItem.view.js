class CartItem{
    constructor() {
        this.$modalTitle = $('.modal-title');
        this.$modalBody = $('.modal-body');
        this.$modalFooter = $('.modal-footer')
        this.$modalContent = $('#modal-content')
    }

    addProductToCartList(product) {
        $.ajax({
            dataType: 'json',
            url: 'api/index.php',
            method: 'GET',
            data: {"action" : "addArticle",
                "articleId": product.id}
        })
            .done( (response) => {
                if(response.state === "OK") {
                    this.clearOutputModal();
                    this.showModalAddProduct(product);
                }
                else{
                    alert(response.state);
                }
            })
            .fail(function(errorData){
                alert(errorData);
            })
    }

    updateProductInCartList(product, action){
        $.ajax({
            dataType: 'json',
            url: 'api/index.php',
            method: 'GET',
            data: {"action" : action,
                "articleId": product.id}
        })
            .done( (response) => {
                if(response.state === "OK"){
                    this.clearOutputModal();
                    this.showModalModifyProduct(action, product);
                    this.drawShoppingCart();
                }
                else{
                    alert(response.state);
                }
            })
            .fail( (errorData) => {
                alert(errorData);
            })
    }

    clearOutputModal(){
        this.$modalTitle.empty();
        this.$modalBody.empty();
    }

    showModalAddProduct(product){
        this.$modalContent.attr('class', 'modal-content border border-success border-5');

        this.$modalTitle.append('<div class="fw-bold fs-5 align-self-center text-success">successfully added</div>');

        this.$modalBody.append('<p class="text-center text-success fw-bold">added product: </p><p class="text-center fs-4 fw-bold">'+ product.articleName + '</p>');

        $('#button-modal-view').text("product list");

        if(this.$modalFooter[0].lastElementChild.innerHTML !== "shopping cart"){
            let $shoppingCartButton = this.createShoppingCartButton();

            this.$modalFooter.append($shoppingCartButton);
        }

        $('#modal-product').modal('show');
    }

    createShoppingCartButton(){
        let $shoppingCartButton = $('<button type="button" id="button-modal-cart" class="btn btn-secondary">shopping cart</button>')

        $shoppingCartButton.on('click', () => {
            this.drawShoppingCart();
            $('#modal-product').modal( 'hide' ).data( 'bs.modal', null );
        });

        return $shoppingCartButton;
    }

    showModalModifyProduct(action, product){
        let color;
        let actionAmount;

        switch(action){
            case "addArticle":
                color = "success";
                actionAmount = "amount increased";
                break;
            case "removeArticle":
                color = "danger";
                actionAmount = "amount decreased";
                break;
        }

        this.$modalContent.attr('class', 'modal-content border border-' + color + ' border-5');
        this.$modalTitle.append('<div class="fw-bold fs-5 text-' + color + ' ">' + actionAmount + '</div>');
        this.$modalBody.append('<p class="text-center text-' + color + ' fw-bold">modified product: </p><p class="text-center fs-4 fw-bold">'+ product.articleName + '</p>');

        $('#button-modal-cart').remove();
        $('#button-modal-view').text("shopping cart");

        $('#modal-product').modal('show');
    }


    drawShoppingCart() {
        let shoppingCart = new ShoppingCart();
        shoppingCart.getShoppingCartList();
    }
}