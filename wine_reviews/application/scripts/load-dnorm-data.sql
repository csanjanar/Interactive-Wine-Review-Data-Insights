USE wine_reviews;

DROP TABLE IF EXISTS denormalised;
CREATE TABLE denormalised (
    country VARCHAR(15),
    description TEXT,
    designation VARCHAR(90),
    points INT,
    province VARCHAR(35),
    taster_name VARCHAR(20),
    taster_twitter_handle VARCHAR(20),
    title VARCHAR(140),
    variety VARCHAR(35),
    winery VARCHAR(55)
);

LOAD DATA INFILE '/home/coder/project/wine_reviews/data/winemag-records.csv'
INTO TABLE denormalised
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
;
