const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'restaurante_saboroso',
    password: 'root'
});

module.exports = connection;