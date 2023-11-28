-- createBurialSelfReqTable.sql
-- Table structure for table burial_self_requests

DROP TABLE IF EXISTS burial_self_requests;

CREATE TABLE burial_self_requests
(
  self_req_id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  requester_fname VARCHAR(40) NOT NULL,
  requester_lname VARCHAR(40) NOT NULL,
  birth_date DATE,
  email VARCHAR(50) NOT NULL,
  phone_num VARCHAR(25) NOT NULL,
  request_date DATE NOT NULL
);