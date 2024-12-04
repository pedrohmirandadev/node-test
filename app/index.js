import express from 'express';
import { createConnection } from 'mysql2';

const app = express();
const port = 3000;

const dbConfig = {
    host: 'database',
    user: 'root',
    port: 3306,
    password:  'root',
    database: 'nodedb',
};

const connection = createConnection(dbConfig);

const sql = `INSERT INTO people(name) values ('Pedro')`;

connection.query(
    'CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)',
    (err) => {
        if (err) console.error('Error creating table:', err);
    }
);

connection.query(sql);

app.get('/', (_, res) => {
    connection.query('SELECT * FROM people', (err, results) => {
        if (err) {
            res.send(err + '<h1>Error fetching names</h1>');
            return;
        }

        const namesList = results.map((row) => `<li>${row.name}</li>`).join('');
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

