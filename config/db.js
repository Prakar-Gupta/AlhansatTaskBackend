const mysql = require('mysql'); // Import the mysql library

const connectDB = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect((err) => {
        if (err) {
            console.log('Could not connect to DB');
            console.error(err);
        } else {
            console.log('Database connected');
        }
    });

    connection.on('end', () => {
        console.log('Database connection closed');
    });
};

module.exports = connectDB;
