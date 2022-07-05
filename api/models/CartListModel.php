<?php


class CartListModel
{
    private $cartProductsList;

    public function __construct(){
        $this->cartProductsList = $this->getCartProductsListFromSession();
    }

    private function getCartProductsListFromSession(){
        if(!isset($_SESSION['shoppingCart'])){
            $_SESSION['shoppingCart'] = array();
        }
        return $_SESSION['shoppingCart'];
    }

    private function setSession(){
        $_SESSION['shoppingCart'] = $this->cartProductsList;
    }


    public function updateProductInCartList($product, $action){

        $productUpdated = false;

        for ($i = 0; $i<count($this->cartProductsList); $i++){

            $cartProduct = $this->cartProductsList[$i];

            if($action == "removeArticle" && $cartProduct["id"] == $product["id"] && $cartProduct["amount"] == 1){
                $this->removeProduct($i);
                $productUpdated = true;
            }

            if (!$productUpdated && $cartProduct["id"] == $product["id"] && $cartProduct["amount"] >= 1){
                $this->changeAmount($i, $action);
                $productUpdated = true;
            }
        }

        if($action == "addArticle" && !$productUpdated){
            $this->addProduct($product);
        }

        $this->setSession();
    }


    private function addProduct($product){
        $product["amount"] = 1;

        array_push($this->cartProductsList, $product);
    }


    private function removeProduct($index){
        array_splice($this->cartProductsList, (int)$index, 1);
    }


    private function changeAmount($index, $action){
        if($action == "addArticle"){
            $this->cartProductsList[$index]["amount"] ++;
        }
        if ($action == "removeArticle"){
            $this->cartProductsList[$index]["amount"] --;
        }
    }


    public function getCartProductsList(){
        $cartList = array();

        if(!isset($_SESSION['shoppingCart']) || $this->cartProductsList == null){
            $cartList = "empty Cart";
        }
        else{
            foreach ($this->cartProductsList as $products){
                $products["amountPrice"] = floatval($products["price"]) * $products["amount"];
                array_push($cartList, $products);
            }
        }

        return (array("cart" => $cartList));
    }

}