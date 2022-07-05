<?php

class ProductTypeListModel implements ProductListInterface{

    private $database;
    private $selectQuery;
    private $productTypesList;
    private $url;

    public function __construct(){
        $this->database = new DatabaseGateway();
        $this->selectQuery = $this->getSelectQuery();
        $this->productTypesList = array();
        $this->url = new RootPath();
    }

    private function getSelectQuery(){
        return "SELECT id, name FROM product_types ORDER BY name";
    }

    public function createOutputList(){
        $this->getProductTypeList();
        return $this->productTypesList;
    }

    private function getProductTypeList(){
        $url = $this->url->getRootPath();
        $url .= "?action=listProductsByTypeId&typeId=";

        $pdoObject = $this->database->getPdoObject();
        try{
            foreach ($pdoObject->query($this->selectQuery) as $listItem) {

                $productType = new stdClass();
                $productType->productType = $listItem["name"];
                $productType->url = $url . $listItem["id"];

                array_push($this->productTypesList, $productType);

            }
        } catch (PDOException $ex){
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$this->selectQuery);
        }

    }
}