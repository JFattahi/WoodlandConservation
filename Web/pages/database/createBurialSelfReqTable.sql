-- Purpose: This SQL file is used to create a table on the MySQL server to store the
-- self burial requests.
-- Creates table structure for the burial_self_requests table.
-- Only run this code once (will delete the table if you try to run it again)
-- 
-- Author: Matthew MacNeil

DROP TABLE IF EXISTS burial_self_requests;

CREATE TABLE burial_self_requests
(
  self_req_id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  requester_fname VARCHAR(40) NOT NULL,
  requester_lname VARCHAR(40) NOT NULL,
  birth_date DATE, -- Birthdate is an optional field
  email VARCHAR(50) NOT NULL,
  phone_num VARCHAR(25) NOT NULL,
  request_date DATE NOT NULL
);