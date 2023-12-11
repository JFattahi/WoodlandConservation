<?php
// Purpose: This PHP file will take fields entered in by an admin using a form and will query
// the burial_other_requests table. The resulting query will be printed out to allow an admin
// to view burial requests made for others.
// Author: Matthew MacNeil

// Fields to query the database (all of them could be null)
$start_date = $_POST["start_date"];
$end_date = $_POST["end_date"];
$start_id = $_POST["start_id"];
$end_id = $_POST["end_id"];
$fname = $_POST["fname"]; // first name for requester
$lname = $_POST["lname"]; // last name for requester
$oth_fname = $_POST["fname-2"]; // first name of the person the request is made for
$oth_lname = $_POST["lname-2"]; // last name of the person the request is made for
$email = $_POST["email"];
$number = $_POST["phone"];

// Used later to print out the names of the columns in the table in an easier to read format
$column_names = array(
    "Request ID",
    "Requester's First Name",
    "Requester's Last Name",
    "Email",
    "Phone",
    "Relationship to Loved One",
    "Loved One's First Name",
    "Loved One's Last Name",
    "Request Date"
);

/**
 * Function to print out the resulting table for the query that is created
 * based on the filters chosen by the admin.
 * 
 * @param mysqli_result $query - the SQL query created based on the admin's input
 * @param array $column_names - the column names for the table being queried
 * 
 * Author: Matthew MacNeil
 */
function print_query($query, $column_names) {
    print "<table style='border-collapse: collapse;'>\n"; // start table

    print "<tr>";

    // Print the header row
    foreach ($column_names as $col_name) {
        print "<th style='border: 1px solid black;'>$col_name</th>";
    }
    print "</tr>";

    // loop through all of the rows in the query
    while ($a_row = mysqli_fetch_row($query)) {
        print "<tr>"; // start row

        // Print each column value
        foreach ($a_row as $columnValue) {
            // center the value and add space between the value and its neighbouring columns for increased readability
            print "<td style='border: 1px solid black; text-align: center; padding: 5px;'>$columnValue</td>";
        }

        print "</tr>"; // end row
    }

    print "</table>"; // end table
}

// Read in database variables
require("../../pages/database/mysqldb_group24A.php");

// Stores the name of the table that will be queried
$table = "burial_other_requests";

// Start building the SQL query
$query = "SELECT * FROM $table WHERE";

// Try to connect to MySQL
$link = mysqli_connect($dbLocation, $dbUsername, $dbPassword);
if (!$link) die("Couldn't connect to MySQL"); // Print out error message if can not connect

// Switch to the database
mysqli_select_db($link, $dbName)
        or die("Couldn't open $dbName: ".mysqli_error($link));

if(strlen($start_date)!=0) {
    // If a start date is given, filter only the requests that occurred on or after that date
    $query .= " req_date >= '$start_date'";
} else {
    // If no start date is given, use a start date that occurred before any requests were made
    $query .= " req_date >= '2023-11-01'";
}

if(strlen($end_date)!=0) {
    // If an end date is given, filter only the requests that occurred on or before that date
    $query .= " AND req_date <= '$end_date'";
}

if(strlen($start_id)!=0) {
    // If a start ID is given, filter only the requests with an ID >= start ID
    $query .= " AND oth_req_id >= $start_id";
}

if(strlen($end_id)!=0) {
    // If an end ID is given, filter only the requests with an ID <= end ID
    $query .= " AND oth_req_id <= $end_id";
}

if(strlen($email)!=0) {
    // Filter only requests with the specified email
    $query .= " AND req_email = '$email'";
}

if(strlen($number)!=0) {
    // Filter only requests with the same number
    $query .= " AND req_phone = '$number'";
}

if(strlen($fname)!=0) {
    // Filter only requests with the same requester first name
    $query .= " AND req_fname = '$fname'";
}

if(strlen($lname)!=0) {
    // Filter only requests with the same requester last name
    $query .= " AND req_lname = '$lname'";
}

if(strlen($oth_fname)!=0) {
    // Filter only requests with the same other first name
    $query .= " AND oth_fname = '$oth_fname'";
}

if(strlen($oth_lname)!=0) {
    // Filter only requests with the same other last name
    $query .= " AND oth_lname = '$oth_lname'";
} 

// End the query
$query .= ";";

$result = mysqli_query($link, $query); // True only if query was successful

// Check if the insertion of data was not successful
if (!$result) print "SQL error: ".mysqli_error($link);

// Stores the number of rows that resulted from the query
$num_rows = mysqli_num_rows($result);

// Print out the table name
print "Burial Other Requests<p>";

// Print out the number of rows only if there are more than 5 rows in the result
if($num_rows > 5) {
    print "There are $num_rows burial requests shown below.<p>";
}

// Print out each row from the result of the query
print_query($result, $column_names);

// Close the MySQL connection
mysqli_close($link);
?>