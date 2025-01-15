INSERT INTO users (username, password, first_name, last_name, phone, addressLine, city, country, zipcode)
VALUES
('Baki Hanma', 'password', 'Baki', 'Hanma', '1234567890', '123 Main St', 'Anytown', 'USA', '12345'),
('jdoe123', 'passw0rd!', 'John', 'Doe', '123-456-7890', '123 Oak St', 'Springfield', 'USA', '54321'),
('jsmith', 'P@ssw0rd', 'Jane', 'Smith', '987-654-3210', '456 Elm St', 'Othertown', 'Canada', '54321');

INSERT INTO subscription (subId, username, startDate, endDate, quota, subType, price)
VALUES
(1, 'Baki Hanma', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 2, "PREMIER", 14.99),
(2, 'jdoe123', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 1, "STANDARD", 9.99),
(3, 'jsmith', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 1, "STANDARD", 9.99);


-- Insert a new record into the staffs table for a normal user
INSERT INTO staffs (username, password, first_name, last_name)
VALUES 
('manager1', 'password1', 'Alice', 'Johnson'),
('normal1', 'password2', 'Bob', 'Williams'),
('normal2', 'password3', 'Charlie', 'Brown');

-- Insert a record into the normals table for the same normal user
INSERT INTO normals (staffID, username, password, first_name, last_name)
VALUES 
(2, 'normal1', 'password2', 'Bob', 'Williams'),
(3, 'normal2', 'password3', 'Charlie', 'Brown');

-- Insert a record into the managers table for the same manager
INSERT INTO managers (staffID, username, password, first_name, last_name, permission)
VALUES (1, 'manager1', 'password1', 'Alice', 'Johnson', 1);

INSERT INTO films (title, stock, outline, genre, avg_rating, film_queue, poster_path, staffID, username)
VALUES
('Avengers: Endgame', 13, 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.', 'Action', 8.4, 0, 'avenger-endgame-movie-poster.png', 1, 'manager1'),

('Barbie', 12, 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.', 'Adventure', 6.8, 0, 'barbie-movie-poster.png', 1, 'manager1'),

('Dune: Part One', 8, 'A noble family becomes embroiled in a war for control over the galaxy''s most valuable asset while its heir becomes troubled by visions of a dark future.', 'Adventure', 8.0, 0, 'dune-movie-poster.png', 1, 'manager1'),

('หอแต๋วแตก แหกสัปะหยด', 3, '“เจ๊แต๋ว” “อาโคย” และ “แพนเค้ก” กับภาคสุดท้ายของหนังในตำนานของคนที่โตมากับ ”หอแต๋วแตก“ เดินทางมาถึงภาค 10 เรื่องราวแปลกๆ ทั้งผี ทั้งคน ที่เกิดขึ้นในหมู่บ้าน “สัปะหยด” แห่งนี้ เกิดจากใคร หรืออะไรกันแน่ ผีร้ายที่ว่าแน่ จะมาเก่งกว่าตัวมารดาของแทร่ได้ยังไง ฮาอาละวาดพร้อมกันในโรงภาพยนตร์', 'Comedy', 8.3, 0, 'hor-taew-tak-the-finale-movie-poster.png', 1, 'manager1'),

('John Wick: Chapter 2', 7, 'After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life.', 'Action', 7.4, 0, 'john-wick-chapter-two-movie-poster.png', 1, 'manager1'),

('Jujutsu Kaisen', 6, 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman''s school to be able to locate the demon''s other body parts and thus exorcise himself.', 'Animation', 8.6, 0, 'jujutsu-kaisen-japanese-movie-poster.png', 1, 'manager1'),

('Oppenheimer', 4, 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'Drama', 8.3, 0, 'oppenheimer-movie-poster.png', 1, 'manager1'),

('Spider-Man: Across the Spider-Verse', 9, 'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.', 'Animation', 8.6, 0, 'spider-man-across-the-spider-verse-movie-poster.png', 1, 'manager1'),

('The Little Mermaid', 6, 'A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.', 'Adventure', 7.2, 0, 'the-little-mermaid-movie-poster.png', 1, 'manager1'),

('Fast X', 7, 'Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.', 'Action', 5.8, 0, 'fast-x-movie-poster.png', 1, 'manager1'),

('Titanic', 13, 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 'Romance', 7.9, 0, 'titanic-movie-poster.png', 1, 'manager1'),

('Kung Fu Panda 3', 11, 'Continuing his "legendary adventures of awesomeness", Po must face two hugely epic, but different threats: one supernatural and the other a little closer to home.', 'Animation', 7.1, 0, 'kung-fu-panda-3-movie-poster.png', 1, 'manager1'),

('ลัดดาแลนด์', 15, 'หลังจากครอบครัวหนึ่งได้ย้ายเข้าไปอยู่ในหมู่บ้านจัดสรรสุดหรู พวกเขาก็ต้องเผชิญกับเหตุการณ์เหนือธรรมชาติสั่นประสาทจนสุดขั้วมากมาย', 'Horror', 6.2, 0, 'laddaland-movie-poster.png', 1, 'manager1'),

('You Don''t Mess with the Zohan', 3, 'An Israeli Special Forces Soldier fakes his death so he can re-emerge in New York City as a hair stylist.', 'Horror', 5.6, 0, 'you-dont-mess-with-the-zohan-movie-poster.png', 1, 'manager1'),

('4KINGS', 18, 'หลังลูกสาววัยรุ่นได้รับบาดเจ็บสาหัสเพราะเด็กช่างกลต่างโรงเรียนตีกัน ผู้เป็นพ่อจึงมีโอกาสนึกย้อนไปถึงความขัดแย้งระหว่างแก๊งเด็กช่าง สมัยเขาเป็นนักเรียนช่วงยุค 90', 'Drama', 6.3, 0, '4king-movie-poster.png', 1, 'manager1'),

('Poor Things', 10, 'An account of the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.', 'Romance', 7.9, 0, 'poor-things-movie-poster.png', 1, 'manager1'),

('La La Lands', 13, 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.', 'Romance', 8.0, 0, 'la-la-land-movie-poster.png', 1, 'manager1'),

('Detective Conan: Zero the Enforcer', 12, 'Detective Conan investigates an explosion that occurs on the opening day of a large Tokyo resort and convention center.', 'Animation', 6.2, 0, 'conan-movie-poster.png', 1, 'manager1'),

('Five Nights at Freddy''s', 2, 'A troubled security guard begins working at Freddy Fazbear''s Pizza. During his first night on the job, he realizes that the night shift won''t be so easy to get through. Pretty soon he will unveil what actually happened at Freddy''s.', 'Horror', 5.5, 0, 'five-nights-at-freddys-movie-poster.png', 1, 'manager1'),

('ร่างทรง', 10, 'เมื่อหลานสาวมีพฤติกรรมแปลกประหลาดชวนหวาดหวั่นขึ้นทุกที หญิงทรงเจ้าจึงต้องเดินหน้าไขความลับที่มืดดำ... และเผชิญคำสาปสะเทือนขวัญประจำตระกูล', 'Horror', 6.5, 0, 'the-medium-rang-zong-movie-poster.png', 1, 'manager1'),

('Ted', 13, 'John Bennett, a man whose childhood wish of bringing his teddy bear to life came true, now must decide between keeping the relationship with the bear, Ted or his girlfriend, Lori.', 'Comedy', 6.9, 0, 'ted-movie-poster.png', 1, 'manager1'),

('เอ๋อเหรอ', 13, 'เรื่องราวของสำรวยและต๋อง พ่อ-ลูกดาวน์ซินโดรมที่เกิดเหตุการณ์พลัดพรากกัน ทำให้สำรวยต้องออกตามหาลูก ซึ่งต๋องและลูกแก้ว (เพื่อนสนิทของต๋อง) ดันบังเอิญไปพัวพันกับแก๊งค้ามนุษย์เข้าอีก', 'Drama', 7.6, 0, 'er-ror-movie-poster.png', 1, 'manager1'),

('บอดี้การ์ดหน้าเหลี่ยม', 4, 'จัดเต็มฉากบู๊และอัดแน่นไปด้วยอารมณ์ขันแบบไทยๆ สำหรับภาพยนตร์ตลกอาชญากรรมที่บอกเล่าเรื่องราวของบอดี้การ์ดส่วนตัวผู้อับโชคอย่างวงศ์คม', 'Action', 7.4, 0, 'bodyguard-movie-poster.png', 1, 'manager1');

INSERT INTO directors (filmID, director)
VALUES
(1, 'Anthony Russo'),
(1, 'Joe Russo'),
(2, 'Greta Gerwig'),
(3, 'Denis Villeneuve'),
(4, 'พจน์ อานนท์'),
(5, 'Chad Stahelski'),
(6, 'Gege Akutami'),
(7, 'Christopher Nolan'),
(8, 'Joaquim Dos Santos'),
(8, 'Kemp Powers'),
(8, 'Justin K. Thompson'),
(9, 'Rob Marshall'),
(10, 'Louis Leterrier'),
(10, 'Justin Lin'),
(11, 'James Cameron'),
(12, 'Alessandro Carloni'),
(12, 'Jennifer Yuh Nelson'),
(13, 'โสภณ ศักดาพิศิษฏ์'),
(14, 'Dennis Dugan'),
(15, 'พุฒิพงษ์ นาคทอง'),
(16, 'Yorgos Lanthimos'),
(17, 'Damien Chazelle'),
(18, 'Gosho Aoyama'),
(19, 'Emma Tammi'),
(20, 'บรรจง ปิสัญธนะกูล'),
(21, 'Seth MacFarlane'),
(22, 'พจน์ อานนท์'),
(23, 'เพ็ชรทาย วงษ์คำเหลา');


INSERT INTO stars (filmID, star)
VALUES
(1, 'Robert Downey Jr.'),
(1, 'Chris Evans'),
(1, 'Mark Ruffalo'),
(2, 'Margot Robbie'),
(2, 'Ryan Gosling'),
(2, 'Issa Rae'),
(3, 'Timothée Chalamet'),
(3, 'Rebecca Ferguson'),
(3, 'Zendaya'),
(4, 'โก๊ะตี๋ อารามบอย'),
(4, 'จาตุรงค์ พลบูรณ์'),
(4, 'วีรดิษฐ์ ศรีมาลัย'),
(5, 'Keanu Reeves'),
(5, 'Riccardo Scamarcio'),
(5, 'Ian McShane'),
(6, 'Satoru Gojo'),
(6, 'Yuji Itador'),
(6, 'Sukuna'),
(6, 'Toji Fushiguro'),
(7, 'Cillian Murphy'),
(7, 'Emily Blunt'),
(7, 'Matt Damon'),
(7, 'Rami Malek'),
(8, 'Miles Morales'),
(8, 'Gwen Stacy'),
(9, 'Halle Bailey'),
(9, 'Jonah Hauer-KingMe'),
(9, 'lissa McCarthy'),
(10, 'Vin Diesel'),
(10, 'Michelle Rodriguez'),
(10, 'Jason Statham'),
(11, 'Leonardo DiCaprio'),
(11, 'Kate Winslet'),
(11, 'Billy Zane'),
(12, 'Po'),
(12, 'Shifu'),
(12, 'Oogway'),
(12, 'Li Shan'),
(12, 'Kai'),
(13, 'สหรัถ สังคปรีชา'),
(13, 'ปิยธิดา วรมุสิก'),
(13, 'สุทัตตา อุดมศิลป์'),
(14, 'Adam Sandler'),
(14, 'John Turturro'),
(14, 'Emmanuelle Chriqui'),
(15, 'อารักษ์ อมรศุภศิริ'),
(15, 'อิชณน์กร พึ่งเกียรติรัศมี'),
(15, 'อุกฤษ วิลลีย์ บรอด ดอนกาเบรียล'),
(16, 'Emma Stone'),
(16, 'Mark Ruffalo'),
(16, 'Willem Dafoe'),
(17, 'Ryan Gosling'),
(17, 'Emma Stoneo'),
(17, 'Rosemarie DeWitt'),
(18, 'Conan Edogawa'),
(18, 'Kogoro Mouri'),
(18, 'Rei Furuya'),
(19, 'Freddy Fazbear'),
(19, 'Bonnie The Bunny'),
(19, 'Chica The Chicken'),
(20, 'นริลญา กุลมงคลเพชร'),
(20, 'สวนีย์ อุทุมมา'),
(20, 'ศิราณี ญาณกิตติกานต์'),
(21, 'Ted'),
(21, 'Mark Wahlberg'),
(22, 'โหน่ง ชะชะช่า'),
(22, 'อลิสา อินทุสมิต'),
(22, 'นวรัตน์ เตชะรัตนประเสริฐ'),
(23, 'เพ็ชรทาย วงษ์คำเหลา'),
(23, 'โทนี่ จา'),
(23, 'โหน่ง ชะชะช่า');

INSERT INTO orders (user_Queue, order_Status, rating, rentDate, returnDate, username, filmID)
VALUES
(1, 'Booking', NULL, CURDATE(), NULL, 'Baki Hanma', 4),
(1, 'Shipped', NULL, CURDATE(), NULL, 'jdoe123', 15),
(1, 'Cancel', NULL, CURDATE(), NULL, 'jsmith', 13),
(2, 'Booking', NULL, CURDATE(), NULL, 'jdoe123', 5),
(2, 'Booking', NULL, CURDATE(), NULL, 'Baki Hanma', 7);

INSERT edits (orderID, staffID, username)
VALUES
(1, 1, 'Baki Hanma'),
(2, 2, 'jdoe123');

UPDATE orders SET order_Status = 'Shipped' WHERE orders.orderID = 1;
UPDATE orders SET order_Status = 'Returned' WHERE orders.orderID = 2;