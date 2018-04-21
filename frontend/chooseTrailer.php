<?php
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
$twig = new \Twig_Environment($loader);

echo $twig->render('chooseTrailer.twig',
    [
        'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'specify your trailer',
        'headingSize' => '2',
    ]
);