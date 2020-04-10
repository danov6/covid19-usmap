<?php

$errorMSG = "";
// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}

$EmailTo = "development@giovaldez.com";

$Subject = "New Message From ";
$Subject .= $name;
$Subject .= " regarding COVID-19 U.S";

$headers = 'From: <development@giovaldez.com>' . "\r\n";

// prepare email body text
$Body = "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

$success = mail($EmailTo, $Subject, $Body, $headers);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "Your email has been sent! We will get back to you shortly";
}else{
    if($errorMSG == ""){
        echo "Something went wrong. Please try again later";
    } else {
        echo $errorMSG;
    }
}

?>