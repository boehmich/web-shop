class ProductCategoryList{

    constructor() {
        this.$categoryListOutput = null;
    }

    getProductCatagories() {
        let self = this;

        $.ajax({
            dataType: 'json',
            url: 'api/index.php',
            method: 'GET',
            data: {"action" : "listTypes"}
        })
            .then(function(response){
                self.prepareOutputCategoryList();
                self.drawCategoryList(response);
            })
            .fail(function(errorData){
                alert(errorData);
            })
    }

    prepareOutputCategoryList(){
        let $output = $('#output');
        $output.empty();

        $output.append('<div class="col-2" id="left-column"><div class="list-group" id="output-categories"></div></div>' +
            '<div class="col" id="right-column"><div class="table table-hover" id="output-products"></div></div>');

        this.$categoryListOutput = $('#output-categories');
    }

    drawCategoryList(response) {

        for(let i in response) {
            let categoryItem = $('<button type="button" class="list-group-item list-group-item-action"><strong>' + response[i].productType.toUpperCase() + '</strong></button>');

            categoryItem.on('click', function(){
                let productList = new ProductList();
                productList.getProductsByCategory(response[i].url);
            });

            this.$categoryListOutput.append(categoryItem);
        }
    }
}