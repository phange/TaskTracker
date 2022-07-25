-- Run this into https://classmysql.engr.oregonstate.edu/ prior to starting up the page using node. Use import and upload this file.
-- if encounter error importing the entire file at once, do it in portions into the SQL tab and troubleshoot from there.
-- Double check login with dbcon.js

-- TaskList --
DROP TABLE IF EXISTS `TaskList`;

-- Variable setup for TaskList table
CREATE TABLE `TaskList` (
  `taskID` INT(11) not null AUTO_INCREMENT,
  `taskDetails` VARCHAR(255) not null,
  PRIMARY KEY (`taskID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Insert values
INSERT INTO `TaskList` (taskDetails)
VALUES ('Go grocery shopping.');


