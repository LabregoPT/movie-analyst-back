INSERT INTO movie_db.publication (name, avatar) VALUES ('The Daily Reviewer', 'glyphicon-eye-open');
INSERT INTO movie_db.publication (name, avatar) VALUES ('International Movie Critic', 'glyphicon-fire');
INSERT INTO movie_db.publication (name, avatar) VALUES ('MoviesNow', 'glyphicon-time');
INSERT INTO movie_db.publication (name, avatar) VALUES ('MyNextReview', 'glyphicon-record');
INSERT INTO movie_db.publication (name, avatar) VALUES ('Movies and Games', 'glyphicon-heart-empty');
INSERT INTO movie_db.publication (name, avatar) VALUES ('TheOne', 'glyphicon-globe');
INSERT INTO movie_db.publication (name, avatar) VALUES ('ComicBookHero.com', 'glyphicon-flash');

INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Robert Smith','https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg','The Daily Reviewer');
INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Chris Harris','https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg','International Movie Critic');
INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Janet Garcia','https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg','MoviesNow');
INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Andrew West','https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg','MyNextReview');
INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Mindy Lee','https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg','Movies and Games');
INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Martin Thomas','https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg','TheOne');
INSERT INTO movie_db.reviewer (name, avatar, publication) VALUES ('Anthony Miller','https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg','ComicBookHero.com');

INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('Deadpool', '2016', 9, 'Robert Smith', 'The Daily Reviewer');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('Thor: Ragnarok', '2017', 7, 'Chris Harris', 'International Movie Critic');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('It', '2017', 8, 'Janet Garcia', 'MoviesNow');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('Dunkirk', '2017', 8, 'Andrew West', 'MyNextReview');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('Logan', '2017', 8, 'Mindy Lee', 'Movies and Games');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('Batman V Superman', '2016', 6, 'Martin Thomas', 'TheOne');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication) VALUES ('Mad Max: Fury Road', '2015', 6, 'Anthony Miller', 'ComicBookHero.com');
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication, pending) VALUES ('Superman: Homecoming', '2017', 10, 'Chris Harris', 'International Movie Critic', true);
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication, pending) VALUES ('Wonder Woman', '2017', 8, 'Martin Thomas', 'TheOne', true;
INSERT INTO movie_db.moviereview (title, `release`, score, reviewer, publication, pending) VALUES ('Doctor Strange', '2016', 7, 'Anthony Miller', 'ComicBookHero.com', true);