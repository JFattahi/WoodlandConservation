-- createBurialOtherReqTable.sql
-- Table structure for table burial_other_requests

DROP TABLE IF EXISTS burial_other_requests;

CREATE TABLE burial_other_requests (
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