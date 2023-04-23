const express = require('express');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');

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

    // Add Item 
    app.post('/api/items', async (req, res) => {
        try {
            const newItem = req.body;
            const result = await itemsCollection.insertOne(newItem);

            // Check if the item was successfully inserted
            if (result.insertedCount === 1) {
                res.status(201).json(result.ops[0]);
            } else {
                // res.status(500).json({ message: 'Error adding item: Insert operation failed.' });
            }
        } catch (err) {
            // res.status(500).json({ message: 'Error adding item:', err });
        }
    });

    // Remove Item
    app.delete('/api/items/:itemId', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const result = await itemsCollection.deleteOne({ _id: new ObjectId(itemId) });
            res.json({ message: 'Item deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting item:', err });
        }
    });

    // Add User 
    app.post('/api/users', async (req, res) => {
        try {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            // res.status(201).json(result.ops[0]);
        } catch (err) {
            // res.status(500).json({ message: 'Error adding user:', err });
        }
    });

    // Remove User 
    app.delete('/api/users/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting user:', err });
        }
    });

    // Rate Item 
    app.post('/api/items/:itemId/rate', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const { userId, rating } = req.body;
            const result = await itemsCollection.updateOne(
                { _id: new ObjectId(itemId) },
                { $push: { ratings: { userId, rating } } }
            );
            res.json({ message: 'Item rated successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error rating item:', err });
        }
    });

    // Review Item 
    app.post('/api/items/:itemId/review', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const { userId, review } = req.body;
            const result = await itemsCollection.updateOne(
                { _id: new ObjectId(itemId) },
                { $push: { reviews: { userId, review } } }
            );
            res.json({ message: 'Item reviewed successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error reviewing item:', err });
        }
    });

    // Get items by category
    app.get('/api/items/category/:category', async (req, res) => {
        try {
            const category = req.params.category;

            const filterDefinition = { category };
            const items = await itemsCollection.find(filterDefinition).toArray();

            res.json(items);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching items by category:', err });
        }
    });

    // User Login
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            const filterDefinition = { userName: username, password };
            const user = await usersCollection.findOne(filterDefinition);

            if (user) {
                res.json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error logging in:', err });
        }
    });

    // Get a single item by ID
    app.get('/api/items/:id', async (req, res) => {
        const itemId = req.params.id;
        console.log('Fetching item with ID:', itemId);
        try {
            const item = await itemsCollection.findOne({ _id: new ObjectId(itemId) });
            if (!item) {
                res.status(404).json({ message: 'Item not found' });
            } else {
                res.json(item);
            }
        } catch (err) {
            res.status(500).json({ message: 'Error fetching item:', err });
        }
    });


    // ... The rest of your endpoints go here, replacing the in-memory data operations with MongoDB queries

    // Server setup
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

