class ProductList {

    constructor() {
        this.$productsByCategoryListOutput = $('#output-products');
    }

    getProductsByCategory(url) {
        let self = this;

        $.ajax({
            dataType: 'json',
            url: url,
            method: 'GET',
        })
            .then(function (response) {
                self.prepareOutputProductsList();
                self.drawProductsByCategory(response);
            })
            .fail(function (errorData) {
                alert(errorData);
            })
    }

    prepareOutputProductsList() {
        this.$productsByCategoryListOutput.empty();
    }

    drawProductsByCategory(response) {
        if (response.ERROR) {
            this.$productsByCategoryListOutput.append('<p class="fw-bold fs-3 text-start">There are no products!</p>');
        } else {

            this.$productsByCategoryListOutput.append('<thead><tr>' +
                '<th scope="col" colspan="3" class="fs-3 fw-bold text-capitalize">' + response.productType + '</th>' +
                '</tr></thead>');

            let tableBody = this.getTableBody(response.products);

            this.$productsByCategoryListOutput.append(tableBody);
        }
    }

    getTableBody(productsList) {
        let $tableBody = $('<tbody>');

        for (let i in productsList) {

            let $row = $('<tr><td scope="row" class="align-middle"><img src="img/' + productsList[i].id + '.png" alt="' + productsList[i].articleName + '" width="200" height="auto">' +
                '<td><p class="fs-4 text-capitalize">' + productsList[i].articleName + '</p><br />' +
                '<p class="fw-bold fs-5">' + parseFloat(productsList[i].price).toFixed(2) + '€</p>' +
                '<span class="description fw-lighter"><small>' + productsList[i].description + '</small></span></td></td></tr>');

            let $addItem = this.createAddItem(productsList[i]);
            $row.append($addItem);

            $tableBody.append($row);
        }
        return $tableBody;
    }

    createAddItem(productsList) {
        let $addItem = $('<td class="align-middle">' +
            '<div class="mx-md-5">' +
            '<p class="border border-2 border-secondary rounded-pill bg-light text-center px-md-2 fw-bold fs-5">add</p></div>');

        $addItem.css('cursor', 'pointer');

        $addItem.on('click', (event) => {
            let cartItem = new CartItem();
            cartItem.addProductToCartList(productsList);
        });
        return $addItem;
    }
}