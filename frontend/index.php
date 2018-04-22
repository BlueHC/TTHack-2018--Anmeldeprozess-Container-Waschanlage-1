<?php
require_once("vendor/autoload.php");

$loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
$twig = new \Twig_Environment($loader);

echo $twig->render('baseHTML.twig',
    [
        'pageTitle' => 'HHLAcleaner',
        'pageHeading' => 'Login',
        'headingSize' => '3',
        'transMail' => 'Email:',
        'transPassword' => 'Password:',
        'transGuest' => 'Continue without registration',
        'transRequestLogin' => 'Forgot your ID?',
        'transWelcome' => 'Moin Moin!',
        'transWelcome2' => 'Welcome to the application of HHLA where you can schedule the cleaning process of your tank container.'
    ]
);