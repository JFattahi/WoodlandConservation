<?php
$enteredPass = $_POST["admin-password"];

// Read in password
require("../../pages/database/mysqldb_group24A.php");

if($enteredPass == $adminPagePass) {
    // Correct password, redirect to the admin page
    header("Location: admin_page.html");
    exit(); // Ensure that no further code is executed after the redirect
} else {
     // Incorrect password, redirect to the same page with an error message
     header("Location: admin_page_login.html");
     exit();
}

?>