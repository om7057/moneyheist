const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise'); // Import mysql2 for database creation

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database configuration
const DB_NAME = 'your_database_name';
const DB_USER = 'your_database_user';
const DB_PASS = 'your_database_password';
const DB_HOST = 'localhost';

// Create the database if it doesn't exist
mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS
}).then(connection => {
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`).then(() => {
    console.log(`Database "${DB_NAME}" created or exists already.`);
  });
}).catch(err => {
  console.error('Database creation failed:', err);
});

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql'
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Test DB Connection and Sync
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync(); // Sync models to the database
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
