<?php
// Purpose: This PHP file is used to redirect a user to either admin_page.html
// or to admin_page_login.html based on the password they enter. This is only a
// prototype, someone can directly access admin_page.html without the password using
// the URL directly.
//
// Author: Matthew MacNeil

$enteredPass = $_POST["admin-password"]; // The password entered by the user

// Read in admin page password
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