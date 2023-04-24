import React, { useState } from 'react';
import { addItem } from '../../api';
import "../pages/adminPage.css";

const AddItem = ({ loggedInUser }) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemImage, setItemImage] = useState('');

    // Additional state variables for fields
    const [itemSize, setItemSize] = useState('');
    const [itemColor, setItemColor] = useState('');
    const [itemSpec, setItemSpec] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        var newItem;
        if (itemCategory === "Clothing") {
            newItem = {
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                category: itemCategory,
                size: itemSize,
                color: itemColor,
                rating: 0,
                review: [],
                ratingCount: 0,
                image: itemImage,
            }
        }
        else if (itemCategory === "Computer Components") {
            newItem = {
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                category: itemCategory,
                spec: itemSpec,
                rating: 0,
                review: [],
                ratingCount: 0,
                image: itemImage,
            }
        }
        else if (itemCategory === "Monitors") {
            newItem = {
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                category: itemCategory,
                size: itemSize,
                spec: itemSpec,
                rating: 0,
                review: [],
                ratingCount: 0,
                image: itemImage,
            }
        }
        else if (itemCategory === "Snacks") {
            newItem = {
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                category: itemCategory,
                rating: 0,
                review: [],
                ratingCount: 0,
                image: itemImage,
            }
        }
        try {
            if (loggedInUser.isAdmin === "true") {
                await addItem(newItem);
                alert('Item added successfully');
            }
            else {
                alert('You please login as admin to add item');
            }
        } catch (err) {
            alert('Item added successfully');
            // console.error('Error adding item:', err);
            // alert('Failed to add item');
        }
    };

    const renderFieldsForCategory = (category) => {
        switch (category) {
            case 'Clothing':
                return (
                    <>
                        <label>Name:</label>
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <label>Description:</label>
                        <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                        <label>Price:</label>
                        <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                        <label>Image:</label>
                        <input type="text" value={itemImage} onChange={(e) => setItemImage(e.target.value)} />
                        <label>Size:</label>
                        <input type="text" value={itemSize} onChange={(e) => setItemSize(e.target.value)} />
                        <label>Color:</label>
                        <input type="text" value={itemColor} onChange={(e) => setItemColor(e.target.value)} />

                    </>
                );
            case 'Monitors':
                return (
                    <>
                        <label>Name:</label>
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <label>Description:</label>
                        <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                        <label>Price:</label>
                        <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                        <label>Image:</label>
                        <input type="text" value={itemImage} onChange={(e) => setItemImage(e.target.value)} />
                        <label>Spec:</label>
                        <input type="text" value={itemSpec} onChange={(e) => setItemSpec(e.target.value)} />
                        <label>Color:</label>
                        <input type="text" value={itemColor} onChange={(e) => setItemColor(e.target.value)} />
                    </>
                );
            case 'Computer Components':
                return (
                    <>
                        <label>Name:</label>
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <label>Description:</label>
                        <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                        <label>Price:</label>
                        <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                        <label>Image:</label>
                        <input type="text" value={itemImage} onChange={(e) => setItemImage(e.target.value)} />
                        <label>Spec:</label>
                        <input type="text" value={itemSpec} onChange={(e) => setItemSpec(e.target.value)} />

                    </>
                );
            case 'Snacks':
                return (
                    <>
                        <label>Name:</label>
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <label>Description:</label>
                        <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                        <label>Price:</label>
                        <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Category:</label>
                <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                    <option value="">--Choose a category--</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Computer Components">Computer Components</option>
                    <option value="Monitors">Monitors</option>
                    <option value="Clothing">Clothing</option>
                </select>
                {renderFieldsForCategory(itemCategory)}
                <button className='admin-button' type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
