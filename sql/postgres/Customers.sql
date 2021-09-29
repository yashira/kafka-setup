DROP TABLE IF EXISTS customers;
CREATE TABLE customers (user_id INTEGER PRIMARY KEY NOT NULL, fname VARCHAR(255), lname VARCHAR(255), email VARCHAR(255), telephone VARCHAR(255));
INSERT INTO customers(user_id,fname,lname,email,telephone) values(1453896,'Jack','Ryan','jackr@abc.com','08918218');
INSERT INTO customers(user_id,fname,lname,email,telephone) values(1453900,'Fedrich','Riykand','fedricr@abc.com','0908918218');
INSERT INTO customers(user_id,fname,lname,email,telephone) values(1454223,'John','White','johnw@abc.com','3208918218');
INSERT INTO customers(user_id,fname,lname,email,telephone) values(1454224,'Greg','Myers','gregm@abc.com','3108118218');
INSERT INTO customers(user_id,fname,lname,email,telephone) values(1859769,'Kevin','Peters','kevinp@abc.com','7608924118');