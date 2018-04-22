<?php

session_start();
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__ . '/lib/templates');
$twig = new \Twig_Environment($loader);

echo $twig->render('uploadImage.twig',[
'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'Upload your waybill',
        'headingSize' => '2'
    ]);