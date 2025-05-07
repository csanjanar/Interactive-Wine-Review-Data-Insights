const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mustacheExpress = require('mustache-express');
const env = require('dotenv').config();

const app = express();
const port = 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './templates');
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection pool (manage database connections)
const dbpool = mysql.createPool({
    connectionLimit: 10, // limit based on application 
    host: env.parsed.HOST,
    user: env.parsed.USER_NAME,
    password: env.parsed.PASSWORD,
    database: env.parsed.DATABASE
});

function templateRenderer(template, res) {
    return function (error, results, fields) {
        if (error)
            throw error;

        res.render(template, { data: results });
    }
}

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/reviews', function (req, res) {
    dbpool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`
            SELECT
                r.title,
                r.description,
                r.points,
                l.country_name,
                l.province_name,
                l.winery_name,
                l.designation_name,
                v.variety_name,
                t.taster_name,
                t.taster_twitter_handle
            FROM Reviews r
            JOIN Locations l ON r.location_id = l.location_id
            JOIN Varieties v ON r.variety_id = v.variety_id
            JOIN Tasters t ON r.taster_id = t.taster_id
            WHERE r.points = (SELECT MAX(points) FROM Reviews);
        `, templateRenderer('reviews', res));
        connection.release(); // Release the connection back to the pool
    });
});

app.get('/varieties', function (req, res) {
    dbpool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`
            SELECT
                v.variety_name,
                COUNT(*) AS variety_count,
                MAX(r.points) AS highest_points
            FROM Varieties v
            JOIN Reviews r ON v.variety_id = r.variety_id
            GROUP BY v.variety_name
            HAVING variety_count > 10
            ORDER BY variety_count DESC;
        `, templateRenderer('varieties', res));
        connection.release(); // Release the connection back to the pool
    });
});

app.get('/countries', function (req, res) {
    dbpool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`
            WITH RankedReviews AS (
                SELECT
                    l.country_name,
                    l.province_name,
                    r.title AS highest_rated_wine,
                    r.points,
                    ROW_NUMBER() OVER (PARTITION BY l.country_name ORDER BY r.points DESC) AS rnk
                FROM
                    Locations l
                JOIN Reviews r ON l.location_id = r.location_id
            )
            SELECT
                country_name AS Country,
                province_name AS Province,
                highest_rated_wine,
                points
            FROM RankedReviews
            WHERE rnk = 1
            ORDER BY points DESC;
        `, templateRenderer('countries', res));
        connection.release(); // Release the connection back to the pool
    });
});

app.get('/wineries', function (req, res) {
    dbpool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`
            SELECT
                l.winery_name AS Winery,
                CONCAT(l.country_name, ",", l.province_name) AS Location,
                COUNT(r.review_id) AS review_count,
                AVG(r.points) AS avg_points 
                    FROM Locations l 
                    JOIN Reviews r ON l.location_id = r.location_id 
                    GROUP BY l.winery_name, location 
                    ORDER BY review_count DESC,
                    avg_points DESC LIMIT 20;
        `, templateRenderer('wineries', res));
        connection.release(); // Release the connection back to the pool
    });
});

app.get('/locations', function (req, res) {
    dbpool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(`
            SELECT
                l.country_name AS Country,
                COUNT(DISTINCT l.province_name) AS num_provinces,
                COUNT(DISTINCT l.winery_name) AS num_wineries,
                COUNT(DISTINCT l.designation_name) AS num_designations
            FROM Locations l
            LEFT JOIN Reviews r ON l.location_id = r.location_id
            GROUP BY l.country_name
            ORDER BY num_designations DESC;
        `, templateRenderer('locations', res));

        connection.release(); // Release the connection back to the pool
    });
});

app.listen(port, function () {
    console.log('The app is listening at http://localhost:' + port + '.');
});
