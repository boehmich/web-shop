<?php

class DatabaseGateway{


    public function __construct(){
    }


    private function generatePdoObject(){
        return new PDO("mysql:host=".DBHost.";dbname=".DBName.";charset=utf8", DBUsername, DBPassword);
    }

    public function getPdoObject(){
        return $this->generatePdoObject();
    }
}
