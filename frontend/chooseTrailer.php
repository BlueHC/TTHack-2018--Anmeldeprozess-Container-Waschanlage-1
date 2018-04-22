<?php
session_start();
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
$twig = new \Twig_Environment($loader);

echo $twig->render('chooseTrailer.twig',
    [
        'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'Please specify your trailer:',
        'headingSize' => '2'
    ]
);

if(isset($_GET["supervise"])){
    $_SESSION["supervise"] = "true";
} else {
    $_SESSION["supervise"] = "false";
}