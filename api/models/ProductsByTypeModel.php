<?php

class ProductsByTypeModel implements ProductListInterface{

    private $productTypeId;
    private $database;
    private $selectQuery;
    private $url;
    private $productsByTypeList;

    public function __construct($productTypeId){
        $this->productTypeId = $productTypeId;
        $this->database = new DatabaseGateway();
        $this->selectQuery = $this->getQuery();
        $this->url = new RootPath();
        $this->productsByTypeList = null;
    }

    private function getQuery(){
        return "SELECT t.name AS productTypeName, p.name AS productName, p.id, p.price_of_sale, p.description
                FROM product_types t 
                JOIN products p ON t.id = p.id_product_types
                WHERE t.id = {$this->productTypeId}";
    }

    public function createOutputList(){
        $this->getProductsByType();
        return $this->productsByTypeList;
    }

    private function getProductsByType(){
        $url = $this->url->getRootPath();
        $url .= "?action=listTypes";

        $result = new stdClass();
        $result->productType = null;
        $result->products = array();
        $result->url = $url;

        $pdoObject = $this->database->getPdoObject();
        try{
            foreach ($pdoObject->query($this->selectQuery) as $listItem) {
                $result->productType = $listItem["productTypeName"];

                $result->products[] = array(
                    "articleName" => $listItem["productName"],
                    "id" => $listItem["id"],
                    "price" => $listItem["price_of_sale"],
                    "description" => $listItem["description"]
                );
            }
        } catch (PDOException $ex){
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$this->selectQuery);
        }

        if($result->productType === null){
            $errorData = array(
                "ERROR" => "TypeId ".$this->productTypeId." not found."
            );
            $this->productsByTypeList = $errorData;
        }
        else{
            $this->productsByTypeList = $result;
        }
    }

}