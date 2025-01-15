const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); // TAE
const multer = require('multer'); // CHING
const path = require('path'); // CHING
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const app = express();
const port = process.env.SERVER_PORT

app.use(cors());
app.use(express.json())

app.get('/movies/:category/poster', (req, res) => {
  const category = req.params.category;
  if (category === 'All') {
    connection.query(
      'SELECT filmID, poster_path FROM films',
      function (err, results) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
  } else if (category === 'Top10') {
    connection.query(
      'SELECT filmID, poster_path FROM films ORDER BY Avg_rating DESC LIMIT 10',
      function (err, results) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
  } else {
    connection.query(
      'SELECT filmID, poster_path FROM films WHERE genre = ?',
      [category],
      function (err, results) {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      }
    );
  }
});

app.get('/movies/poster/search/:searchInput', (req, res) => {
  const search = req.params.searchInput;
  connection.query(
    'SELECT filmID, poster_path FROM films WHERE title LIKE ?',
    ['%' + search + '%'],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:filmID', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'SELECT * FROM films WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:filmID/director', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'SELECT director FROM directors WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/movies/:filmID/star', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'SELECT star FROM stars WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.post('/:user/queue', (req, res) => {
  const user = req.params.user;
  const filmID = req.body.filmID;
  let current_user_queue;
  let current_film_stock;

  connection.query(
    'SELECT stock FROM films WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      current_film_stock = results[0].stock;

      if (current_film_stock <= 0) {
        res.status(400).send('This movie is out of stock');
        return;
      }
      connection.query(
        'SELECT COUNT(*) as user_Queue FROM orders WHERE username = ? and order_Status = "Booking"',
        [user],
        function (err, results) {
          if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
            return;
          }
          current_user_queue = results[0].user_Queue;

          if (current_user_queue >= 5) {
            res.status(400).send('You has reached the maximum number of movies in queue.');
            return;
          }

          connection.query(
            'SELECT * FROM orders WHERE username = ? AND filmID = ? AND (order_Status = "Booking" OR order_Status = "Shipped")',
            [user, filmID],
            function (err, results) {
              if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Error querying database');
                return;
              }

              if (results.length > 0) {
                res.status(400).send('This movie is already in your queue.');
                return;
              }

              connection.query(
                'INSERT INTO orders (user_Queue, order_Status, rentDate, returnDate, username, filmID) VALUES (?, ?, ?, ?, ?, ?)',
                [current_user_queue + 1, 'Booking', new Date(), null, user, filmID],
                function (err, results) {
                  if (err) {
                    console.error('Error querying database:', err);
                    res.status(500).send('Error querying database');
                    return;
                  }
                  res.status(201).send('Movie added to queue.');
                }
              );
            }
          );
        }
      );
    }
  );
});

app.put('/:filmID/stock', (req, res) => {
  const filmID = req.params.filmID;

  connection.query(
    'UPDATE films SET stock = stock - 1 WHERE filmID = ?',
    [filmID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.status(200).send('Stock updated');
    }
  )
})

app.post('/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT password FROM users WHERE BINARY username = ?',
    [username],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      if (results.length <= 0 || results[0].password !== password) {
        res.status(400).send('Incorrect username or password.');
        return;
      }

      res.status(200).send('User logged in');
    }
  );
});

app.post('/staff', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    `(SELECT normals.staffid AS normalStaffId, managers.staffid AS managerStaffId, normals.username AS normalUser, managers.username AS managerUser, 
    normals.password AS normalPassword, managers.password AS managerPassword, managers.permission 
    FROM normals 
    LEFT JOIN managers ON normals.username = managers.username 
    WHERE BINARY normals.username = ?)
    UNION
    (SELECT normals.staffid AS normalStaffId, managers.staffid AS managerStaffId, normals.username AS normalUser, managers.username AS managerUser, 
    normals.password AS normalPassword, managers.password AS managerPassword, managers.permission 
    FROM managers 
    LEFT JOIN normals ON managers.username = normals.username 
    WHERE BINARY managers.username = ?)`,
    [username, username],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      if (results.length <= 0 || (results[0].normalPassword !== password && results[0].managerPassword !== password)) {
        res.status(401).json({message: 'Incorrect username or password.'});
        return;
      }
  
      if (results[0].managerUser === username) {
        res.status(200).json({message: 'Manager logged in', staffid: results[0].managerStaffId, username: results[0].managerUser});
      } else {
        res.status(200).json({message: 'Staff logged in', staffid: results[0].normalStaffId, username: results[0].normalUser});
      }
    }
  );
});

// TAE
app.put('/update', (req, res) => {
  const username = req.body.username;
  const addressLine = req.body.addressLine;
  const city = req.body.city;
  const country = req.body.country;
  const zipcode = req.body.zipcode;
  const phone = req.body.phone;
  

  connection.query(
    "UPDATE users SET addressLine = ?, city = ?, zipcode = ?, country = ?, phone = ? WHERE username = ? ", 
    [addressLine, city, zipcode, country, phone, username],
    (err, result) => {
      if (err) {
        console.error('Error updating address:', err);
        res.status(500).send("Error updating address");
      } else {
        console.log("Address updated successfully");
        res.status(200).send("Address updated successfully");
      }
    }
  );
});

app.post('/create',(req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const addressLine = req.body.addressLine;
  const city = req.body.city;
  const country = req.body.country;
  const zipcode = req.body.zipcode;
  const phone = req.body.phone;

  connection.query(
      "INSERT INTO users (first_name,last_name,addressLine,city,zipcode,country,phone) VALUES(?,?,?,?,?,?,?)", 
      [first_name, last_name, addressLine, city, zipcode,country, phone],
      (err,result) => {
          if(err){
              console.log(err)
          }else{
              res.send("Values inserted");
          }
      }
  );
})

app.post('/register', (req, res) => {
  const userInfo = req.body.userInfo;
  const subscription = req.body.subscriptionInfo;

  connection.query(
    `INSERT INTO users (username, password, first_name, last_name, phone, addressLine, city, country, zipcode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [userInfo.username, userInfo.password, userInfo.first_name, userInfo.last_name, userInfo.phone,
    userInfo.addressLine, userInfo.city, userInfo.country, userInfo.zipcode],
    function (err, result) {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ success: false, message: "Register Failed" });
      }

      connection.query(
        `INSERT INTO subscription (username, startDate, endDate, quota, subType, price)
        VALUES (?, CURDATE(),DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?, ?, ?);`,
        [userInfo.username, subscription.quota, subscription.subType, subscription.price],
        function (err, result) {
          if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ success: false, message: "Register Failed" });
          }
          
          return res.status(200).json({ success: true, message: "Register Success" });
        }
      );
    }
  );
});
// TAE

// Phreuk
app.get('/orders/shipped/:user', (req, res) =>{
  const user = req.params.user;

  connection.query(
    'SELECT o.rentDate,f.title,o.rating FROM orders as o JOIN films AS f ON o.filmID = f.filmID JOIN users AS u ON o.username = u.username WHERE order_Status = "Shipped" AND o.username = ? ORDER BY o.rentDate ASC ',
    [user],
    function (err, results) {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  }
  );
  });
  
  app.get('/orders/booking/:user', (req, res) =>{
    const user = req.params.user;

    connection.query(
      'SELECT f.title,o.rating,f.genre,o.user_Queue,o.orderID FROM orders as o JOIN films AS f ON o.filmID = f.filmID JOIN users AS u ON o.username = u.username WHERE order_Status = "Booking" AND o.username = ?  ORDER BY o.user_Queue ASC',
      [user],
      function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
    );
    });
  
    app.patch('/orders/CancelledQueue/:user', (req, res) => {
      const user = req.params.user;
      const user_Queue = req.body;

      connection.query(
          'UPDATE orders SET order_Status = "Canceled",user_Queue = NULL WHERE user_Queue = ? AND order_Status = "Booking" AND username = ? ',
          [user_Queue.user_Queue, user],
          function (err, results) {
              if (err) {
                  console.error('Error querying database:', err);
                  res.status(500).send('Error querying database');
                  return;
              }
  
              connection.query(
                  'UPDATE orders SET user_Queue = user_Queue - 1 WHERE user_Queue > ? AND order_Status = "Booking" AND username = ?',
                  [user_Queue.user_Queue, user],
                  function (err, results) {
                      if (err) {
                          console.error('Error querying database:', err);
                          res.status(500).send('Error querying database');
                          return;
                      }
  
                   
                      res.json( results);
                  }
              );
          }
      );
  });

    app.patch('/orders/moveQueues/:user', async (req, res) => {
      const user = req.params.user;
      const { orderID, user_Queue, direction } = req.body;
  
      if (!orderID || !user_Queue || direction === undefined) {
          return res.status(400).json({ error: 'Invalid request parameters' });
      }
  
      const maxUserQueueQuery = 'SELECT MAX(user_Queue) AS max_user_queue FROM orders WHERE username = ? AND order_Status = "Booking"';
      const [maxUserQueueResults] = await connection.promise().query(maxUserQueueQuery, [user]);
  
      const maxUserQueue = maxUserQueueResults[0].max_user_queue;
  
      try {
          if ((user_Queue < maxUserQueue && direction === 1) || (user_Queue <= maxUserQueue && direction === -1 && (user_Queue-1 != 0))) {
              if (direction === -1) { 
                  const swap = 'UPDATE orders SET user_Queue = user_Queue + 1 WHERE user_Queue = ? AND username = ? AND order_Status = "Booking"';
                  await connection.promise().query(swap, [user_Queue - 1, user]);
              } else if (direction === 1) {
                  const swap = 'UPDATE orders SET user_Queue = user_Queue - 1 WHERE user_Queue = ? AND username = ? AND order_Status = "Booking"';
                  await connection.promise().query(swap, [user_Queue + 1, user]);
              }
  
              const updateQuery = 'UPDATE orders SET user_Queue = user_Queue + ? WHERE orderID = ? AND username = ? AND order_Status = "Booking"';
              await connection.promise().query(updateQuery, [direction, orderID, user]);
  
              res.json({ success: true });
          } else {
              res.status(400).json({ error: 'Invalid move direction or user queue position' });
          }
      } catch (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Error querying database' });
      }
  });

// Phreuk

// FIRST
app.get('/orders/history/:user', (req, res) => {
  const user = req.params.user;
  connection.query(
  'SELECT f.title, o.username, o.rating, o.returnDate, o.orderID, o.filmID FROM orders AS o JOIN films AS f ON o.filmID = f.filmID JOIN users AS u ON o.username = u.username WHERE o.order_Status = "Returned" AND o.username = ? ',
  [user],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.patch('/orders/history/rating/:orderID', (req, res) => {
  const orderID = req.params.orderID;
  const { newRating } = req.body;
  connection.query(
    'UPDATE orders SET rating = ? WHERE orderID = ?',
    [newRating, orderID],
    function(err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

app.patch('/orders/history/avgrating/:filmID', (req, res) => {
  const filmID = req.params.filmID;
  connection.query(
    'UPDATE films SET avg_rating = (SELECT AVG(rating) FROM orders WHERE order_Status = "Returned" AND filmID = ?) WHERE filmID = ?',
    [filmID, filmID],
    function(err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  );
});

// FIRST

// NINE
app.put('/:orderID/:status', (req, res) => {
  const orderID = req.params.orderID;
  const status = req.params.status;
  const staffID = req.body.staffID; // assuming staffID is sent in the request body
  const username = req.body.username; // assuming username is sent in the request body

  let sqlQuery = '';
  if (status === 'Returned') {
    sqlQuery = 'UPDATE orders SET order_Status = ?, ReturnDate = NOW() WHERE orderID = ?';
  } else if (status === 'Shipped') {
    sqlQuery = 'UPDATE orders SET order_Status = ?, user_queue = NULL WHERE orderID = ?';
  } else {
    sqlQuery = 'UPDATE orders SET order_Status = ? WHERE orderID = ?';
  }

  connection.query(
    sqlQuery,
    [status, orderID],
    function (err, results) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }

      // After updating the order status, insert a new record into the edits table
      const insertEditsQuery = 'INSERT INTO edits (orderID, staffID, username) VALUES (?, ?, ?)';
      connection.query(
        insertEditsQuery,
        [orderID, staffID, username],
        function (err, results) {
          if (err) {
            console.error('Error updating edits table:', err);
            res.status(500).send('Error updating edits table');
            return;
          }
          res.status(200).send('Order status and edits table updated');
        }
      );
    }
  );
});

 app.get('/orders', (req, res, next) => {
  connection.query(
    'SELECT orders.username, orders.orderID, orders.order_Status, users.city, users.phone, users.country, users.addressLine, users.zipcode, films.title, subscription.quota FROM `users` INNER JOIN orders ON users.username = orders.username INNER JOIN subscription ON subscription.username = orders.username INNER JOIN films ON films.filmid = orders.filmid' ,
    function (err, results, fields) {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying database');
        return;
      }
      res.json(results);
    }
  )
});

// NINE

// CHINGCHING
var filename;
app.post('/films', (req, res) => {
  const title = req.body.title;
  const stock = req.body.stock;
  const outline = req.body.outline;
  const genre = req.body.genre;
  const poster_Path = req.body.poster_Path;
  filename = poster_Path;
  const staff = req.body.staff;
  const adminUser = req.body.adminUser;


  connection.query("INSERT INTO films (title, stock, outline, genre, avg_rating, film_queue, poster_path, staffID, username) VALUES(?,?,?,?,?,?,?,?,?)",
[title, stock, outline, genre, 0.0, 0, poster_Path, staff, adminUser],
(err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send(result.insertId.toString());
  }
})
})

app.post('/stars', (req, res) => {
  const star = req.body.star;
  const filmID = req.body.filmId;

  connection.query("INSERT INTO stars (filmID, star) VALUES(?, ?)",
[filmID, star],
(err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send("Values inserted");
  }
})
})

app.post('/directors', (req, res) => {
  const director = req.body.director;
  const filmID = req.body.filmId;

  connection.query("INSERT INTO directors (filmID, director) VALUES(?, ?)",
[filmID, director],
(err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send("Values inserted");
  }
})
})

app.get('/movies', (req, res) => {
  connection.query("SELECT filmID, title, stock FROM films", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/foreign', (req, res) => {
  connection.query("SELECT * FROM stars", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/moreforeign', (req, res) => {
  connection.query("SELECT * FROM directors", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/orderforeign', (req, res) => {
  connection.query("SELECT * FROM orders", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/edit', (req, res) => {
  connection.query("SELECT edits.*, orders.* FROM edits INNER JOIN orders ON edits.orderId = orders.orderId", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.delete('/movies/:filmID', (req, res) => {
  const id = req.params.filmID;
  connection.query("DELETE FROM films WHERE filmID = ?", id, (err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send(result);
  }
})
})

app.delete('/foreign/:filmID', (req, res) => {
  const id = req.params.filmID;
  connection.query("DELETE FROM stars WHERE filmID = ?", id, (err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send(result);
  }
})
})

app.delete('/moreforeign/:filmID', (req, res) => {
  const id = req.params.filmID;
  connection.query("DELETE FROM directors WHERE filmID = ?", id, (err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send(result);
  }
})
})

app.delete('/edit/:filmID', (req, res) => {
  const id = req.params.filmID;
  connection.query("DELETE e FROM edits e JOIN orders o ON e.orderID = o.orderID WHERE o.filmID = ?", id, (err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send(result);
  }
})
})

app.delete('/orderforeign/:filmID', (req, res) => {
  const id = req.params.filmID;
  connection.query("DELETE FROM orders WHERE filmID = ?", id, (err, result) => {
  if(err) {
    console.log(err);
  } else {
    res.send(result);
  }
})
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/posters'));
  },
  filename: function (req, file, cb) {
    cb(null, filename);
  }
});

const upload = multer({ storage: storage }).single('image');

app.post('/upload', (req, res, next) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    res.status(200).send('File uploaded successfully');
  });
});

// CHING
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
