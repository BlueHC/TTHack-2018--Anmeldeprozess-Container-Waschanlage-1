<?php
session_start();
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
$twig = new \Twig_Environment($loader);


echo $twig->render('dashboard.twig',
    [
        'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'Overview',
        'headingSize' => '2',
        'dateETA' => ($_POST["dateETA"]),
        'timeETA' => ($_POST["timeETA"])
    ]
);