/* create a project database, and drop it first if it already exists */
DROP DATABASE IF EXISTS wine_reviews;
CREATE DATABASE wine_reviews;

/* create a database user, called francis, and drop it first if it already exists */
DROP USER IF EXISTS 'francis'@'%';
CREATE USER 'francis'@'%' IDENTIFIED WITH mysql_native_password BY 'california';

/* grant user access to the project data, which was created earlier */
GRANT ALL ON wine_reviews.* TO 'francis'@'%';

/* only for running in colab, grant user francis to server related configuration */
GRANT SELECT ON mysql.* TO 'francis'@'%';
