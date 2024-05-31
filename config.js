// config.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Importeer en configureer dotenv

const dbUrl = process.env.DATABASE_URL;
const dbName = 'fitbuddy'; // Vervang 'jouw-database' door de naam van jouw database

let db;

// Functie om verbinding te maken met de database
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(dbUrl);
    db = client.db(dbName);
    console.log(`Verbonden met de database: ${dbName}`);
  } catch (err) {
    console.error('Kon geen verbinding maken met de database', err);
  }
};

// Functie om de databaseverbinding op te halen
const getDB = () => {
  if (!db) {
    throw new Error('Database is niet verbonden!');
  }
  return db;
};

module.exports = { connectDB, getDB };
