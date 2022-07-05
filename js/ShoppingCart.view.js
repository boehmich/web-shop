class ShoppingCart {

    constructor() {
        this.$shoppingCartOutput = null;
    }

    getShoppingCartList() {
        $.ajax({
            dataType: 'json',
            url: 'api/index.php',
            method: 'GET',
            data: {"action": "listCart"}
        })
            .done((response) => {
                this.prepareOutputShoppingCartList();
                this.drawShoppingCartList(response);
            })
            .fail((errorData) => {
                alert(errorData);
            })
    }

    prepareOutputShoppingCartList() {
        let $output = $('#output');
        $output.empty();

        $output.append('<div class="col">' +
            '<div class="list-group list-group-flush" id="output-shoppingcart-list"></div></div>');

        this.$shoppingCartOutput = $('#output-shoppingcart-list');
    }

    drawShoppingCartList(response) {
        if (response.cart === "empty Cart") {
            this.$shoppingCartOutput.append($('<p class="fw-bold fs-2 text-center">Your Shopping Cart is empty!</p>'))
        } else {
            this.getShoppingCartListOutput(response.cart);
        }
    }

    getShoppingCartListOutput(cartList) {
        let result = 0;

        for (let i in cartList) {
            let $row = $('<li class="list-group-item d-flex justify-content-between flex-row">');

            $row.append('<div class="p-md-2 align-self-center"><img src="img/' + cartList[i].id + '.png" alt="' + cartList[i].articleName + '" width="150" height="auto"></div>');
            $row.append('<div class="p-md-4 w-50"><p class="fw-bold fs-4 text-capitalize">' + cartList[i].articleName + '</p></div>')
            $row.append('<div class="p-md-4"><p class="fst-italic fs-6 text-end">price per piece: ' + parseFloat(cartList[i].price).toFixed(2) + '€</p>' +
                '<p class="fw-light fs-6 text-end">amount: ' + cartList[i].amount + '</p>' +
                '<p class="fw-bold fs-5 text-end">total price: ' + cartList[i].amountPrice.toFixed(2) + '€</p></div>');

            let $updateElement = this.getUpdateElement(cartList[i]);
            $row.append($updateElement);

            result += cartList[i].amountPrice;

            this.$shoppingCartOutput.append($row);
        }

        this.$shoppingCartOutput.append('<li class="list-group-item align-self-center">' +
            '<div class="text-center my-5 p-md-3 border border-3 bg-light border-secondary rounded-pill">' +
            '<p class="fw-bold fs-2 text-decoration-underline px-5">total price: ' + result.toFixed(2) + '€</p></div></li>');
    }


    getUpdateElement(product) {
        let $addElement = this.createUpdateElement(product, "addArticle");
        let $removeElement = this.createUpdateElement(product, "removeArticle");

        let $updateElement = $('<div class="p-md-3 align-self-center px-3"></div>');
        $updateElement.append($addElement, $removeElement);

        return $updateElement;
    }


    createUpdateElement(product, action) {
        let updateItem = null

        switch (action) {
            case "addArticle":
                updateItem = "+";
                break;
            case "removeArticle":
                updateItem = "-";
                break;
        }

        let $updateElement = $('<div><p class="text-center fw-bold fs-5 border border-2 border-secondary bg-light rounded-circle px-2">' + updateItem + '</p></div>');

        $updateElement.css('cursor', 'pointer');

        $updateElement.on('click', (event) => {
            let cartItem = new CartItem();
            cartItem.updateProductInCartList(product, action);
        });

        return $updateElement;
    }

}