-- Drop some tables firstly
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS post_like CASCADE;
DROP TABLE IF EXISTS comment_like CASCADE;

-- Create some new tables
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_name VARCHAR(255),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  like_count INTEGER,
  user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE comment (
  comment_id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  like_count INTEGER,
  user_id INTEGER REFERENCES users(user_id),
  post_id INTEGER REFERENCES post(post_id)
);

CREATE TABLE post_like (
    post_like_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE(post_id, user_id)
);

CREATE TABLE comment_like (
    comment_like_id SERIAL PRIMARY KEY,
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE(comment_id, user_id)
);

-- *** Maybe cause some errors in this part, because the passwords are stored in an encrypted method on the backend.
-- But here just use the clear text directly.
-- HOW TO SOLVE THIS PROBLEM:
-- After use insert command, start server service, and enter reset1.html to reset the password.

--Insert some values into tables
-- user_id = 1
INSERT INTO users (username, email, password) VALUES ('user1','user1@test.com','password');
-- user_id = 2
INSERT INTO users (username, email, password) VALUES ('user2','user2@test.com','password');
-- post_id = 1 and created by user1
INSERT INTO post (title, content, user_id) VALUES ('THIS IS THE FIRST TITLE','THIS IS THE FIRST CONTENT', 1);
-- comment_id = 1, under post1, created by user1
INSERT INTO comment (text, user_id, post_id) VALUES ('THIS IS THE FIRST COMMENT', 1, 1);
-- comment_id = 2, under post1, created by user2
INSERT INTO comment (text, user_id, post_id) VALUES ('THIS IS THE SECOND COMMENT', 2, 1);
