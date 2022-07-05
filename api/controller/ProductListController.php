<?php

class ProductListController
{
    private $jsonView;
    private $productList;

    public function __construct(){
        $this->jsonView = new JsonView();
    }


    public function getProductList($listType)
    {
        $productListIsCreated = $this->createProductList($listType);

        if ($productListIsCreated) {
            $outputList = $this->productList->createOutputList();
            $this->jsonView->streamOutput( $outputList );
        }
        else {
            $this->jsonView->streamOutput(array("ERROR" => "creating productlist failed"));
        }
    }


    private function createProductList($listType)
    {
        switch ( $listType ) {
            case "listTypes":
                $this->productList = new ProductTypeListModel();
                break;
            case "listProductsByTypeId":
                $productTypeId = $this->validateParameter('typeId');
                $this->productList = new ProductsByTypeModel($productTypeId);
                break;

            case false: default:
            return false;
        }

        return true;
    }

    private function validateParameter($unvalidatedParameter)
    {
        return filter_input(INPUT_GET, $unvalidatedParameter, FILTER_SANITIZE_SPECIAL_CHARS);
    }
}
