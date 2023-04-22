const express = require('express');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const app = express();
// const uri = process.env.MONGODB_CONNECTION_STRING;
const uri = "mongodb+srv://Anilbc99:Anilbc99@cluster-abc.kynooiw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
        process.exit(1);
    }

    console.log('Connected to MongoDB Atlas');
    const db = client.db('E-Commerce');
    const itemsCollection = db.collection('items');
    const usersCollection = db.collection('users');

    // Middleware to serve static files
    app.use(express.static(path.join(__dirname, '..', 'build')));

    // Catch-all route to serve index.html for any other request
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    });

    // API Endpoints

    // Get all items
    app.get('/api/items', async (req, res) => {
        try {
            const items = await itemsCollection.find().toArray();
            // console.log('Items:', items);
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching items:', err });
        }
    });

    // Get all users
    app.get('/api/users', async (req, res) => {
        try {
            const users = await usersCollection.find().toArray();
            // console.log('Users:', users);
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching users:', err });
        }
    });


    // ... The rest of your endpoints go here, replacing the in-memory data operations with MongoDB queries



    // Server setup
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

