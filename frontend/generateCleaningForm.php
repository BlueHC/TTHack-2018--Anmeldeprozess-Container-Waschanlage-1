<?php
session_start();

//Formhandler
function Formhandler($Type, $Identifyer, $Chambers){

        $_SESSION["TrailerType"] = $Type;
        $_SESSION["TrailerChambers"] = $Chambers;
        $_SESSION["TrailerIdentifyer"] = $Identifyer;

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

if(isset($_GET["create"]))
{
    if(isset($_POST["Numberplate"])){
    $PostIdentifyer = ($_POST["Numberplate"]);
}else {
    $PostIdentifyer = ($_POST["Tanknumber"]);
}

Formhandler(($_POST["Ttype"]), $PostIdentifyer, ($_POST["amountChamber"]));
}

