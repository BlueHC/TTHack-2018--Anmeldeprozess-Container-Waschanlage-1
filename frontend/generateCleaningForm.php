<?php
session_start();


//Formhandler
function Formhandler($Type, $Identifyer, $Chambers){
    if($Type = "20" and $Chambers <= 3 or $Type = "20+20" and $Chambers <= 6 or $Type = "40" and $Chambers <= 5){

        require_once("vendor/autoload.php");

        $loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
        $twig = new \Twig_Environment($loader);

        echo $twig->render('createForm.twig',
            [
                "typeImage" => $Type,
                "amountChambermodals" => $Chambers,
                "trailerIdentifyer" => $Identifyer,
                "transCoveramount" => "transCoveramount",
                "transWalltype" => "transWalltype",
                "transSurface" => "transSurface",
                "transWalltype" => "Surface",
                "transLastDischarge" => "Last Discharge"
            ]
        );
        exit();



    }
}

if(isset($_GET["create"]))
{
    if(isset($_POST["Numberplate"])){
    $Identifyer = $_POST["Numberplate"];
}else {
    $PostIdentifyer = $_POST["Tanknumber"];
}

Formhandler($_POST["Ttype"], $PostIdentifyer, $_POST["amountChamber"]);
}

