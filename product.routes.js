const express = require('express');
const products = require('./products');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
    return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', (request, response) => {
    const { brand } = req.params; // Access the brand parameter from the URL

    // Filter products based on the brand parameter
    const filteredProducts = products.filter(product => product.brand === brand);

    res.json(filteredProducts); // Send the filtered products as a JSON response
});

module.exports = router;