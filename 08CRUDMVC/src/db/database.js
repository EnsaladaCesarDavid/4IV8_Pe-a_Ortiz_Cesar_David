const mysql = require('mysql2');

//Creamos la conexion

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Cdavid05',
    database : 'practicacrud',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

//La exportamos para poder usarla
module.exports = pool.promise();