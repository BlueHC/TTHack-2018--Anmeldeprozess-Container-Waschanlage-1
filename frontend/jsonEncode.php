<?php
session_start();

echo $_SESSION["TrailerChambers"], $_SESSION["TrailerIdentifyer"], $_SESSION["TrailerType"];

print_r(json_encode($_POST));



session_destroy();
