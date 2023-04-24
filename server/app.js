const express = require('express');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');

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
    app.delete('/api/items/:id', async (req, res) => {
        const itemId = req.params.id;
        try {
            // Get users who have reviewed the item
            const users = await usersCollection.find({ "reviews.itemId": new ObjectId(itemId) }).toArray();

            // Remove item reviews from users and update user's average rating
            for (const user of users) {
                // Remove item review from the user's reviews
                const updatedReviews = user.reviews.filter(review => review.itemId.toString() !== itemId);

                // Calculate the new average rating for the user
                const totalRatings = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
                const newAverageRating = updatedReviews.length ? totalRatings / updatedReviews.length : 0;

                // Update the user in the database
                await usersCollection.updateOne(
                    { _id: new ObjectId(user._id) },
                    {
                        $set: {
                            reviews: updatedReviews,
                            averageRating: newAverageRating,
                        },
                    }
                );
            }

            // Remove the item from the database
            const result = await itemsCollection.deleteOne({ _id: new ObjectId(itemId) });
            res.json({ message: 'Item removed successfully', deletedCount: result.deletedCount });
        } catch (err) {
            res.status(500).json({ message: 'Error removing item:', err });
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
    app.delete('/api/users/:id', async (req, res) => {
        const userId = req.params.id;
        try {
            // Get the user
            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

            // Remove user's reviews from items and update ratings
            for (const review of user.reviews) {
                const item = await itemsCollection.findOne({ _id: new ObjectId(review.itemId) });
                const newTotalRatings = item.rating * item.ratingCount - review.rating;
                const newRatingCount = item.ratingCount - 1;
                const newAverageRating = newRatingCount ? newTotalRatings / newRatingCount : 0;

                await itemsCollection.updateOne(
                    { _id: new ObjectId(review.itemId) },
                    {
                        $pull: { reviews: { userName: user.userName } },
                        $set: {
                            ratingCount: newRatingCount,
                            rating: newAverageRating,
                        },
                    }
                );
            }
            // Remove the user from the database
            const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

            res.json({ message: 'User removed successfully', deletedCount: result.deletedCount });
        } catch (err) {
            res.status(500).json({ message: 'Error removing user:', err });
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

    // Submit a review
    app.post('/api/items/:id/review', async (req, res) => {
        try {
            const itemId = req.params.id;
            const { userId, reviewText, rating } = req.body;

            // Find the item and user in the database
            const item = await itemsCollection.findOne({ _id: ObjectId(itemId) });
            const user = await usersCollection.findOne({ _id: ObjectId(userId) });

            // Calculate the new average rating
            const newTotalRatings = item.rating + parseInt(rating);
            const newRatingCount = item.ratingCount + 1;
            const newAverageRating = newTotalRatings / newRatingCount;

            // Update the item's reviews and ratings in the database
            await itemsCollection.updateOne(
                { _id: ObjectId(itemId) },
                {
                    $push: {
                        reviews: {
                            userName: user.userName,
                            text: reviewText,
                            rating: parseInt(rating),
                        },
                    },
                    $set: {
                        ratingCount: newRatingCount,
                        rating: newAverageRating,
                    },
                }
            );

            // Update the user's reviews in the database
            await usersCollection.updateOne(
                { _id: ObjectId(userId) },
                {
                    $push: {
                        reviews: {
                            itemId: ObjectId(itemId),
                            itemName: item.name,
                            reviewText: reviewText,
                            rating: parseInt(rating),
                        },
                    },
                }
            );

            res.json({ message: 'Review submitted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error submitting review:', err });
        }
    });

    // Get a user's reviews
    app.get('/api/users/:userId/reviews', async (req, res) => {
        const userId = req.params.userId;
        try {
            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json(user.reviews);
            }
        } catch (err) {
            res.status(500).json({ message: 'Error fetching user reviews:', err });
        }
    });

    // Server setup
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});


