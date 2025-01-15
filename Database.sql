CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(10),
    addressLine VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    zipcode VARCHAR(100)
);

CREATE TABLE subscription (
    username VARCHAR(20),
    subId INT NOT NULL AUTO_INCREMENT,
    startDate DATE,
    endDate DATE,
    quota INT,
    subType VARCHAR(20),
    price DECIMAL(10, 2),
    FOREIGN KEY (username) REFERENCES users(username),
    PRIMARY KEY (subId)
);

CREATE TABLE staffs (
    staffID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    password VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE normals (
    staffID INT,
    username VARCHAR(20),
    password VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    PRIMARY KEY (staffID),
    FOREIGN KEY (staffID) REFERENCES staffs(staffID),
    FOREIGN KEY (username) REFERENCES staffs(username)
);

CREATE TABLE managers (
    staffID INT,
    username VARCHAR(20),
    password VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    permission TINYINT,
    PRIMARY KEY (staffID),
    FOREIGN KEY (staffID) REFERENCES staffs(staffID),
    FOREIGN KEY (username) REFERENCES staffs(username)
);

CREATE TABLE films (
    filmID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    stock INT,
    outline VARCHAR(255),
    genre VARCHAR(100),
    avg_rating DECIMAL(3, 1),
    film_queue INT,
    poster_path VARCHAR(255),
    staffID INT,
    username VARCHAR(20),
    FOREIGN KEY (staffID) REFERENCES staffs(staffID),
    FOREIGN KEY (username) REFERENCES staffs(username)
);

CREATE TABLE orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    user_Queue INT,
    order_Status VARCHAR(20),
    rating DECIMAL(3, 1),
    rentDate DATE,
    returnDate DATE,
    username VARCHAR(20),
    filmID INT,
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (filmID) REFERENCES films(filmID)
);

CREATE TABLE stars (
    filmID INT,
    star VARCHAR(100),
    PRIMARY KEY (filmID, star),
    FOREIGN KEY (filmID) REFERENCES films(filmID)
);

CREATE TABLE directors (
    filmID INT,
    director VARCHAR(100),
    PRIMARY KEY (filmID, director),
    FOREIGN KEY (filmID) REFERENCES films(filmID)
);

CREATE TABLE edits (
    orderID INT,
    staffID INT,
    username VARCHAR(20),
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (staffID) REFERENCES staffs(staffID),
    FOREIGN KEY (username) REFERENCES users(username)
);
