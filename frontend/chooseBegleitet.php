<?php
session_start();
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
$twig = new \Twig_Environment($loader);

echo $twig->render('chooseBegleitet.twig',
    [
        'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'Do you want to supervise the cleaning?',
        'headingSize' => '2',
    ]
);