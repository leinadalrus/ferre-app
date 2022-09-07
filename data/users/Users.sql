CREATE TABLE Document {
  documentID INT NOT NULL,
  documentTitle VARCHAR(254),
  bodyContents VARCHAR(254),
  userID INT NOT NULL,

  PRIMARY KEY (documentID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
};

CREATE TABLE Users {
  userID INT NOT NULL,
  userName VARCHAR(254),
  firstName VARCHAR(254),
  lastName VARCHAR(254),
  emailAddress VARCHAR(254),
  creationDate TIMESTAMP,

  PRIMARY KEY (userID), 
};