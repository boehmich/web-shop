<?php

session_start();

class ShoppingCartController
{
    private $jsonView;
    private $cartItem;
    private $cartList;

    public function __construct(){
        $this->jsonView = new JsonView();
        $this->cartItem = new CartItemModel();
        $this->cartList = new CartListModel();
    }

    public function updateShoppingCart($action){
        $articleId = $this->validateParameter('articleId');

        $this->cartItem->setProductByArticleId($articleId);

        $state = $this->cartItem->checkState();

        if($state === "OK"){
            $product = $this->cartItem->getProduct();
            $this->cartList->updateProductInCartList($product, $action);
        }

        $this->jsonView->streamOutput(array("state" => $state));
    }


    public function showCartProducts(){

        $outputList = $this->cartList->getCartProductsList();

        $this->jsonView->streamOutput($outputList);
    }


    private function validateParameter($unvalidatedParameter){

        return filter_input(INPUT_GET, $unvalidatedParameter, FILTER_SANITIZE_SPECIAL_CHARS);
    }
}