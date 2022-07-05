<?php

error_reporting(E_ALL);

include("controller/Router.php");
include("controller/ProductListController.php");
include("controller/ShoppingCartController.php");
include("models/ProductListInterface.php");
include("services/RootPath.php");
include("models/ProductsByTypeModel.php");
include("models/CartItemModel.php");
include("models/CartListModel.php");
include("models/ProductTypeListModel.php");
include("services/DatabaseGateway.php");
include("view/JsonView.php");

define("DBHost", "localhost");
define("DBName", "DB");
define("DBUsername", "root");
define("DBPassword", "");

