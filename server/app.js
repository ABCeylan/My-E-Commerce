const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
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

    // API Endpoints

    // Get all items
    app.get('/api/items', async (req, res) => {
        try {
            const items = await itemsCollection.find().toArray();
            console.log('Items:', items);
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching items:', err });
        }
    });

    // ... The rest of your endpoints go here, replacing the in-memory data operations with MongoDB queries

    // Server setup
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
});

