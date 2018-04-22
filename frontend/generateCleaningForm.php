<?php
session_start();

//Formhandler
function Formhandler($Type, $Identifier, $Chambers){

        $_SESSION["TrailerType"] = $Type;
        $_SESSION["TrailerChambers"] = $Chambers;
        $_SESSION["TrailerIdentifier"] = $Identifier;

        require_once("vendor/autoload.php");

        $loader = new \Twig_Loader_Filesystem(__DIR__.'/lib/templates');
        $twig = new \Twig_Environment($loader);

        echo $twig->render('createForm.twig',
            [
                "typeImage" => $Type,
                "amountChambermodals" => $Chambers,
                "trailerIdentifier" => $Identifier,
                "transCoveramount" => "transCoveramount",
                "transCoveramount" => "Coveramount",
                "transWalltype" => "transWalltype",
                "transSurface" => "transSurface",
                "transWalltype" => "Surface",
                "transLastDischarge" => "Last Discharge",
                "transWalls" => "Type of Walls",
                "pageHeadline" => "Total number of chambers: $chambers"
            ]
        );
        exit();



}

if(isset($_GET["create"]))
{
    if(isset($_POST["NumberPlate"])){
    $PostIdentifyer = ($_POST["NumberPlate"]);
}else {
    $PostIdentifyer = ($_POST["Tanknumber"]);
}

Formhandler(($_POST["Ttype"]), $PostIdentifyer, ($_POST["amountChamber"]));
}

