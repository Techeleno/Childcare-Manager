CREATE DATABASE childcare_db;


USE childcare_db;


CREATE TABLE childcare_branches (
    phone_number VARCHAR(20),
    childcare_address VARCHAR(250) UNIQUE NOT NULL,
    branch_id VARCHAR(20) PRIMARY KEY
);

CREATE TABLE family (
    family_id VARCHAR(20) PRIMARY KEY,
    family_address VARCHAR(250) UNIQUE NOT NULL,
    branch_id VARCHAR(20) NOT NULL,
    fee INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES childcare_branches(branch_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE family_member (
    member_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    family_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (family_id) REFERENCES family(family_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (member_id)
);

CREATE TABLE parent (
    member_id VARCHAR(20) PRIMARY KEY,
    payment_info VARCHAR(20) NOT NULL,
    email VARCHAR(250),
    phone_number VARCHAR(20),
    FOREIGN KEY (member_id) REFERENCES family_member(member_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE schedule (
    schedule_id VARCHAR(20) PRIMARY KEY,
    monday BOOL,
    tuesday BOOL,
    wednesday BOOL,
    thursday BOOL,
    friday BOOL,
    saturday BOOL,
    sunday BOOL,
    start_time TIME,
    end_time TIME,
    CHECK (end_time>start_time)
);


CREATE TABLE child (
    member_id VARCHAR(20) PRIMARY KEY,
    birthday DATE,
    schedule_id VARCHAR(20) NOT NULL,
    meal_name VARCHAR(20),
    meal_time TIME,
    FOREIGN KEY (member_id) REFERENCES family_member(member_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)
);


CREATE TABLE birthday_to_age (
    birthday DATE PRIMARY KEY,
    age INT NOT NULL,
    CHECK (age>=0)
);


CREATE TABLE childcare_branch_room (
    room_number INT NOT NULL,
    room_capacity INT,
    branch_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (room_number, branch_id),


    FOREIGN KEY (branch_id) REFERENCES childcare_branches(branch_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (room_number, branch_id)
);


CREATE TABLE caretaker (
    name VARCHAR(40),
    employee_id VARCHAR(20) PRIMARY KEY DEFAULT 'N/A',
    branch_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES childcare_branches(branch_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE activity (
    name VARCHAR(250) PRIMARY KEY,
    type VARCHAR(250),
    employee_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES caretaker(employee_id)
        ON DELETE SET DEFAULT
        ON UPDATE CASCADE
);


CREATE TABLE child_does_activity (
    date DATE,
    duration TIME,
    time TIME,
    child_member_id VARCHAR(20),
    activity_name VARCHAR (250),
    PRIMARY KEY (date, time, child_member_id, activity_name),
    FOREIGN KEY (child_member_id) REFERENCES child(member_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (activity_name) REFERENCES activity(name)
);


CREATE TABLE lunch_option (
    meal_name VARCHAR(100) PRIMARY KEY,
    time_to_prepare TIME,
    is_vegetarian BOOL
);


CREATE TABLE caretaker_prepare_lunch (
    employee_id VARCHAR(20),
    meal_name VARCHAR(20),
    PRIMARY KEY (employee_id, meal_name),
    FOREIGN KEY (employee_id) REFERENCES caretaker(employee_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (meal_name) REFERENCES lunch_option(meal_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO childcare_branches (branch_id, childcare_address, phone_number) VALUES
('B1', '9849 West Mall', '123-456-7890'),
('B2', '5461 Westbrook', '987-654-3210'),
('B3', '3812 Oak St', '111-222-3333'),
('B4', '1981 Pine St', '444-555-6666'),
('B5', '3645 16th Ave', '777-888-9999');

INSERT INTO family (family_id, family_address, branch_id, fee) VALUES
('F1', '1234 Road Place', 'B1', 200),
('F2', '4567 Marine Drive', 'B2', 400),
('F3', '7894 Oak St', 'B1', 400),
('F4', '1560 Pine St', 'B3', 550),
('F5', '4895 41st Ave', 'B2', 180);

INSERT INTO family_member (member_id, first_name, last_name, family_id) VALUES
('1', 'Frank', 'Song', 'F1'),
('2', 'Jake', 'Lake', 'F2'),
('3', 'Michelle', 'James', 'F1'),
('4', 'Edward', 'Wong', 'F3'),
('5', 'Donnie', 'Tello', 'F2'),
('6', 'Frannie', 'Song', 'F1'),
('7', 'Jon', 'Lake', 'F2'),
('8', 'Mike', 'James', 'F1'),
('9', 'Emma', 'Wong', 'F3'),
('10', 'Leo', 'Nardo', 'F2');


INSERT INTO parent (member_id, payment_info, email, phone_number) VALUES
('1', '4724123412345678', 'franksong@cpsc.what', '123-456-7890'),
('2', '4580789453164528', 'jakelake@cpsc.what', '987-654-3210'),
('3', '4568123123512355', 'michelle.james@cpsc.what', '111-222-3333'),
('4', '8465213576197538', 'edward_wong@cpsc.what', '444-555-6666'),
('5', '4982159784531238', 'purpleninjaturtle@cpsc.what', '777-888-9999');

INSERT INTO schedule (schedule_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_time, end_time) VALUES
('S1', true, true, false, true, false, false, false, '08:00:00', '16:00:00'),
('S2', false, false, true, true, false, false, false, '07:30:00', '15:30:00'),
('S3', true, true, true, false, true, false, false, '09:00:00', '17:00:00'),
('S4', false, true, false, true, false, true, false, '10:00:00', '18:00:00'),
('S5', false, false, false, false, true, true, true, '11:30:00', '19:30:00');


INSERT INTO child (member_id, birthday, schedule_id, meal_name, meal_time) VALUES
('6', '2015-03-12', 'S1', 'Lunch', '12:00:00'),
('7', '2017-08-25', 'S2', 'Dinner', '18:30:00'),
('8', '2014-11-05', 'S1', 'Breakfast', '08:00:00'),
('9', '2019-02-20', 'S3', 'Snack', '15:30:00'),
('10', '2016-05-10', 'S2', 'Lunch', '12:30:00');


INSERT INTO birthday_to_age(birthday, age) VALUES
('2015-03-12', 8),
('2017-08-25', 6),
('2014-11-05', 8),
('2019-02-20', 4),
('2016-05-10', 7);


INSERT INTO childcare_branch_room (room_number, room_capacity, branch_id) VALUES
(101, 30, 'B1'),
(102, 25, 'B1'),
(201, 20, 'B2'),
(202, 15, 'B2'),
(301, 30, 'B3');


INSERT INTO caretaker (name, employee_id, branch_id) VALUES
('Sammy', 'E1', 'B1'),
('Daniel', 'E2', 'B2'),
('Leia', 'E3', 'B1'),
('Peter', 'E4', 'B3'),
('Samuel', 'E5', 'B2');


INSERT INTO activity (name, type, employee_id) VALUES
('Drawing', 'Art', 'E1'),
('Painting', 'Art', 'E2'),
('Sand Castles', 'Games', 'E3'),
('Jungle Gym', 'Sports', 'E4'),
('Gymnastics', 'Sports', 'E5');


INSERT INTO child_does_activity (date, duration, time, child_member_id, activity_name) VALUES
('2023-10-01', '01:00:00', '10:00:00', '6', 'Drawing'),
('2023-10-02', '00:45:00', '14:30:00', '7', 'Painting'),
('2023-10-03', '00:30:00', '11:00:00', '8', 'Sand Castles'),
('2023-10-04', '02:00:00', '15:00:00', '9', 'Jungle Gym'),
('2023-10-05', '01:30:00', '13:45:00', '10', 'Gymnastics'),
('2023-10-02', '00:45:00', '14:30:00', '6', 'Painting'),
('2023-10-03', '00:30:00', '11:00:00', '6', 'Sand Castles'),
('2023-10-04', '02:00:00', '15:00:00', '6', 'Jungle Gym'),
('2023-10-05', '01:30:00', '13:45:00', '6', 'Gymnastics'),
('2023-10-02', '00:45:00', '14:30:00', '7', 'Drawing'),
('2023-10-03', '00:30:00', '11:00:00', '7', 'Sand Castles'),
('2023-10-04', '02:00:00', '15:00:00', '7', 'Jungle Gym'),
('2023-10-05', '01:30:00', '13:45:00', '7', 'Gymnastics'),
('2023-10-02', '00:45:00', '14:30:00', '8', 'Painting'),
('2023-10-03', '00:30:00', '11:00:00', '8', 'Drawing'),
('2023-10-04', '02:00:00', '15:00:00', '8', 'Jungle Gym'),
('2023-10-05', '01:30:00', '13:45:00', '8', 'Gymnastics');


INSERT INTO lunch_option (meal_name, time_to_prepare, is_vegetarian) VALUES
('Fruit Salad', '00:15:00', true),
('Chicken Strips', '00:30:00', false),
('Ham Sandwich', '00:15:00', false),
('Congee', '01:00:00', true),
('Egg Salad', '00:30:00', false);


INSERT INTO caretaker_prepare_lunch (employee_id, meal_name) VALUES
('E1', 'Fruit Salad'),
('E2', 'Chicken Strips'),
('E3', 'Ham Sandwich'),
('E4', 'Congee'),
('E5', 'Egg Salad');


