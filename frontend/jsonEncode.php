<?php
session_start();

$sessions = array($_SESSION["TrailerChambers"], $_SESSION["TrailerIdentifyer"], $_SESSION["TrailerType"], $_SESSION["supervise"], $_SESSION["guest"]);

$toEncode = array_merge($_POST, $sessions);

$json = json_encode($toEncode);

echo $json;

$url = 'http://192.168.178.110:3001/washorder';
$data = array('name' =>'test', 'json' => $json);

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

var_dump($result);


session_abort();

