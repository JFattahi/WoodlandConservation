<?php
// Field to query the database
$start_date = $_POST["start_date"];
$end_date = $_POST["end_date"];
$start_id = $_POST["start_id"];
$end_id = $_POST["end_id"];
$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];
$number = $_POST["phone"];

$column_names = array(
    "Request ID",
    "First Name",
    "Last Name",
    "Date of Birth",
    "Email",
    "Phone",
    "Request Date"
);

function print_query($query, $column_names) {
    print "<table style='border-collapse: collapse;'>\n";
    
    // Print the header row
    print "<tr>";
    foreach ($column_names as $col_name) {
        print "<th style='border: 1px solid black;'>$col_name</th>";
    }
    print "</tr>";

    while ($a_row = mysqli_fetch_row($query)) {
        print "<tr'>";

        // Print each column value
        foreach ($a_row as $columnValue) {
            print "<td style='border: 1px solid black; text-align: center; padding: 5px;'>$columnValue</td>";
        }

        print "</tr>";
    }

    print "</table>";
}

// Read in database variables
require("../../pages/database/mysqldb_group24A.php");

$table = "burial_self_requests";

$query = "SELECT
    self_req_id AS Request_ID,
    requester_fname AS First_Name,
    requester_lname AS Last_Name,
    birth_date AS Date_of_Birth,
    email AS Email,
    phone_num AS Phone,
    request_date AS Request_Date
FROM $table WHERE";

// Try to connect to MySQL
$link = mysqli_connect($dbLocation, $dbUsername, $dbPassword);
if (!$link) die("Couldn't connect to MySQL");

// Switch to the database
mysqli_select_db($link, $dbName)
        or die("Couldn't open $dbName: ".mysqli_error($link));

if(strlen($start_date)!=0) {
    $query = $query." request_date >= '$start_date'";
} else {
    $query = $query." request_date >= '2023-11-01'"; // set start date to before requests started
}

if(strlen($end_date)!=0) {
    $query = $query." AND request_date <= '$end_date'";
    // $end_date = date("Y-m-d"); // set end_date to today
}

if(strlen($start_id)!=0) {
    $query = $query." AND self_req_id >= $start_id";
    // $start_id = "1"; // set the start_id to the first id
}

if(strlen($end_id)!=0) {
    $query = $query." AND self_req_id <= $end_id";
    // $end_id = "1000000"; // should change
}

if(strlen($email)!=0) {
    $query = $query." AND email = '$email'";
    // $email = "@";
}

if(strlen($number)!=0) {
    $query = $query." AND phone_num = '$number'";
}

if(strlen($fname)!=0) {
    $query = $query." AND requester_fname = '$fname'";
}

if(strlen($lname)!=0) {
    $query = $query." AND requester_lname = '$lname';";
} else {
    $query = $query.";";
}

$result = mysqli_query($link, $query); // True only if query was successful

// Check if the insertion of data was not successful
if (!$result) print "SQL error: ".mysqli_error($link);

$num_rows = mysqli_num_rows($result);

print "Burial Self Requests<p>";

if($num_rows > 5) {
    print "There are $num_rows burial requests shown below.<p>";
}

print_query($result, $column_names);

mysqli_close($link);


?>