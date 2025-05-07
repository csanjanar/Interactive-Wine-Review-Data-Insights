USE wine_reviews;

DELETE FROM Reviews;
DELETE FROM Tasters;
DELETE FROM Locations;
DELETE FROM Varieties;


-- Insert data into Varieties table
INSERT INTO Varieties (variety_name)
SELECT DISTINCT variety
FROM denormalised;

-- Insert data into Locations table
INSERT INTO Locations (country_name, province_name, winery_name, designation_name)
SELECT DISTINCT country, province, winery, designation
FROM denormalised;

-- Insert data into Tasters table
INSERT INTO Tasters (taster_name, taster_twitter_handle)
SELECT DISTINCT taster_name, taster_twitter_handle
FROM denormalised;

-- Insert data into Reviews table
INSERT INTO Reviews (title, description, points, location_id, variety_id, taster_id)
SELECT
  title,
  description,
  points,
  l.location_id,
  v.variety_id,
  t.taster_id
FROM
  denormalised d
  JOIN Locations l ON d.country = l.country_name
    AND d.province = l.province_name
    AND d.winery = l.winery_name
    AND d.designation = l.designation_name
  JOIN Varieties v ON d.variety = v.variety_name
  JOIN Tasters t ON d.taster_name = t.taster_name;
