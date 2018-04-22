<?php
session_start();
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
$twig = new \Twig_Environment($loader);

echo $twig->render('chooseBegleitet.twig',
    [
        'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'Which service offer do you prefer?',
        'headingSize' => '2',
        'transAnswer1' => 'Drive-through',
        'transAnswer2' => 'Drop-off'
    ]
);

if(isset($_GET["guest"])){
    $_SESSION["guest"] = true;
}