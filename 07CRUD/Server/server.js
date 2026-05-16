const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'pnt_practica1',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
});

const db = pool.promise();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

app.use(express.static('public'));

app.get('/api/datos', async (req, res) => {
    try {
        res.json({ mensaje: "Conexión lista para interactuar con la BD" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log('Servidor inicializado en el puerto: ' + PORT);
    console.log('Para salir presiona ctrl + c');
});