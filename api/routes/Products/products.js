const express = require('express');
const router = express.Router();
const { 
    importCSV, 
    getProducts, 
    updateProduct, 
    aggregateProducts, 
    updateProduct_get,
    getProduct 
} = require('../../controllers/product-ctrl');



router.get('/import', importCSV);

router.get('/fetchdata', getProducts);

router.get('/aggregate', aggregateProducts);

router.get('/:query/update', updateProduct_get);

router.get('/:id', getProduct);

router.put('/:query/update', updateProduct);



module.exports = router;