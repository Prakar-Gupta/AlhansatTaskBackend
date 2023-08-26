const db = require('../config/db');

const createTaskTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            status VARCHAR(255) DEFAULT 'To Do'
        )
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.log('Could not create tasks table');
            console.error(err);
        } else {
            console.log('Tasks table created');
        }
    });
};

module.exports = createTaskTable;
