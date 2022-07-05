<?php


class Router
{
    private $jsonView;

    public function __construct()
    {
        $this->jsonView = new JsonView();
    }

    public function route()
    {
        $action = $this->validateParameter('action');

        switch ( $action ) {
            case "listTypes":
            case "listProductsByTypeId":
                $productListController = new ProductListController();
                $productListController->getProductList($action);
                break;
            case "addArticle":
            case "removeArticle":
                $shoppingCartController = new ShoppingCartController();
                $shoppingCartController->updateShoppingCart($action);
                break;
            case "listCart":
                $shoppingCartController = new ShoppingCartController();
                $shoppingCartController->showCartProducts();
                break;
            default:
                $this->jsonView->streamOutput(array("ERROR" => "Action Type ".$action." not found."));
                break;
        }
    }

    private function validateParameter($unvalidatedParameter)
    {
        return filter_input(INPUT_GET, $unvalidatedParameter, FILTER_SANITIZE_SPECIAL_CHARS);
    }
}