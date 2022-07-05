<?php


class CartItemModel
{

    private $database;
    private $product;

    public function __construct(){
        $this->database = new DatabaseGateway();
        $this->product = null;
    }


    public function setProductByArticleId($articleId){

        $query = "SELECT name, price_of_sale, description, id FROM products WHERE id={$articleId} LIMIT 1";

        $pdoObject = $this->database->getPdoObject();

        try{
            foreach ($pdoObject->query($query) as $listItem) {

                $this->product = array(
                    "articleName" => $listItem["name"],
                    "price" => $listItem["price_of_sale"],
                    "description" => $listItem["description"],
                    "id" => $listItem["id"]
                );
            }
        }
        catch (PDOException $ex){
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$query);
        }
    }

    public function checkState(){
        if($this->product !== null){
            return "OK";
        }
        return "ERROR";
    }

    public function getProduct(){
        return $this->product;
    }

}
