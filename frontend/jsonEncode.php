<?php
session_start();

$sessions = array("Trailer.chambers" =>$_SESSION["TrailerChambers"], "Trailer.identifier" =>$_SESSION["TrailerIdentifier"], "Trailer.type" =>$_SESSION["TrailerType"], "Trailer.supervise" =>$_SESSION["supervise"], "name" => "test");

$toEncode = array_merge($_POST, $sessions);

$data_string = json_encode($toEncode);

$ch = curl_init('192.168.178.107:3001/washorder');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string))
);
curl_exec($ch);

session_abort();

header("Refresh:4; url= uploadImage.php");

