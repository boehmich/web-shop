<?php


class RootPath
{

    private $rootPath;

    public function __construct(){;
        $this->rootPath = $this->generateRootPath();
    }

    public function getRootPath(){
        return $this->rootPath;
    }

    private function generateRootPath(){

        $rootPath = (empty($_SERVER['HTTPS'])) ? 'http' : 'https';
        $rootPath .= $_SERVER['HTTP_HOST'];
        $rootPath .= $_SERVER['REQUEST_URI'];


        $rootPathParts = parse_url($rootPath);
        

        $path = strval($rootPathParts['path']);

        return ((empty($_SERVER['HTTPS'])) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $path;

    }

}