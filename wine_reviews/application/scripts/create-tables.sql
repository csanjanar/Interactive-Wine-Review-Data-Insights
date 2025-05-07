USE wine_reviews;

DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Varieties;
DROP TABLE IF EXISTS Tasters;
DROP TABLE IF EXISTS Locations;

CREATE TABLE Locations (
  location_id int AUTO_INCREMENT PRIMARY KEY,
  country_name varchar(15) NOT NULL,
  province_name varchar(35) NOT NULL,
  winery_name varchar(55) NOT NULL,
  designation_name varchar(90) NOT NULL
);

CREATE TABLE Tasters (
  taster_id int AUTO_INCREMENT PRIMARY KEY,
  taster_name varchar(20) NOT NULL,
  taster_twitter_handle varchar(20) NOT NULL
);

CREATE TABLE Varieties (
  variety_id int AUTO_INCREMENT PRIMARY KEY,
  variety_name varchar(35) NOT NULL
);

CREATE TABLE Reviews (
  review_id int AUTO_INCREMENT PRIMARY KEY,
  title varchar(140) NOT NULL,
  description text NOT NULL,
  points int NOT NULL,
  location_id int,
  variety_id int,
  taster_id int,
  FOREIGN KEY (location_id) REFERENCES Locations (location_id),
  FOREIGN KEY (variety_id) REFERENCES Varieties (variety_id),
  FOREIGN KEY (taster_id) REFERENCES Tasters (taster_id)
);

