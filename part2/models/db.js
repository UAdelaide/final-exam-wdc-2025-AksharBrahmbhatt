const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',         // use your MySQL password if you have one
  database: 'DogWalkService'
});

module.exports = db;
