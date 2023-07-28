CREATE DATABASE movie_db CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE movie_db.publication (name VARCHAR(255) PRIMARY KEY, avatar VARCHAR(21));
CREATE TABLE movie_db.reviewer (name VARCHAR(255) PRIMARY KEY, avatar VARCHAR(255), publication VARCHAR(255), FOREIGN KEY (publication) REFERENCES publication(name) ON DELETE CASCADE);
CREATE TABLE movie_db.moviereview (title VARCHAR(255) PRIMARY KEY, 
								   `release` VARCHAR(255),
									score INTEGER,
                                    reviewer VARCHAR(255),
                                    publication VARCHAR(255),
                                    pending boolean default false,
                                    FOREIGN KEY (reviewer) REFERENCES reviewer(name),
                                    FOREIGN KEY (publication) REFERENCES reviewer(publication)
                                    ON DELETE CASCADE);
