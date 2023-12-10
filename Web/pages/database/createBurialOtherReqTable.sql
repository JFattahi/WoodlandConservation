-- Purpose: This SQL file is used to create a table on the MySQL server to store the
-- other burial requests.
-- Creates table structure for the burial_other_requests table.
-- Only run this code once (will delete the table if you try to run it again)
-- 
-- Author: Matthew MacNeil

DROP TABLE IF EXISTS burial_other_requests;

CREATE TABLE burial_other_requests 
(
  -- All fields are required
  oth_req_id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  req_fname VARCHAR(40) NOT NULL,
  req_lname VARCHAR(40) NOT NULL,
  req_email VARCHAR(50) NOT NULL,
  req_phone VARCHAR(25) NOT NULL,
  relationship VARCHAR(100) NOT NULL,
  oth_fname VARCHAR(40) NOT NULL,
  oth_lname VARCHAR(40) NOT NULL,
  req_date DATE NOT NULL
);