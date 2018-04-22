<?php
session_start();

$sessions = array("Trailer.chambers" =>$_SESSION["TrailerChambers"], "Trailer.identifier" =>$_SESSION["TrailerIdentifier"], "Trailer.type" =>$_SESSION["TrailerType"], "Trailer.supervise" =>$_SESSION["supervise"], "name" => "test");

$toEncode = array_merge($_POST, $sessions);

$json = json_encode($toEncode);

//API Url
$url = 'http://192.168.178.110:3001/washorder';

//Initiate cURL.
$ch = curl_init($url);

//The JSON data.
$jsonData = "{
    name: 'test',
    company : '',
    customerNumber: '',
    Trailer: [{
        type:".$_SESSION['TrailerType'].",
        identifier:".$_SESSION["TrailerIdentifier"].",
        cmr : [{}],
        chambers : [{
            coveramount : ".($_POST["amountCover_Chamber1"]).",
            walltype : ".($_POST["typeWall_Chamber1"])."
        }]
        }]}";

//Encode the array into JSON.
$jsonDataEncoded = json_encode($jsonData);

//Tell cURL that we want to send a POST request.
curl_setopt($ch, CURLOPT_POST, 1);

//Attach our encoded JSON string to the POST fields.
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);

//Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

//Execute the request
$result = curl_exec($ch);


session_abort();

