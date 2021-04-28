const Product = require('../models/product');
const fs = require('fs');
const fastcsv = require("fast-csv");


const csvfile = __dirname + "/../../api/public/files/products.csv";
const stream = fs.createReadStream(csvfile);


const aggregateProducts = async (req, res) => {
    try {
        const aggregatedProducts = await Product.aggregate([
            { $group: { _id: "$name", total: { $sum: 1 }}}
        ]).limit(50);
        // res.send({success: "Products aggregated", status: 200, data: aggregatedProducts});
        res.render('aggregate', { products: aggregatedProducts, title: 'Aggregated blogs' });
    } catch(err) {
        // res.send({ error: "Error on aggregating product", status: 403 });
        res.render('404', { title: 'Blog not found' });
    }
}

const updateProduct_get = async (req, res) => {
    try {
        const sku = req.params.query;
        res.render('update', {sku: sku, title: 'update'});
    } catch(err) {
        res.render('404', { title: 'Page not found' });
    }
}


const updateProduct = async (req, res) => {
    try {
        const productDets = req.params.body;
        const product = { sku: req.params.query };
        console.log(product);
        const updateTo = { $set: { name: productDets.name, sku: productDets.sku, description: productDets.description }};
        await Product.updateOne(product, updateTo);
        // res.send({ success: "Updated product detail successfully", status: 200 });
        res.render('product', {product: productDets, title: 'product details'});
    } catch(err) {
        // res.send({ error: "Error on updatig produt", status: 403 });
        res.render('404', { title: 'Product not found' });
    }
}

const importCSV = async (req, res) => {

    try {
        let  products  = []
        let csvStream = await fastcsv
        .parse()
        .on("data", function(data) {
            products.push({
            name: data[0],
            sku: data[1],
            description: data[2]
            });
        })
        .on("end", function() {
            // remove the first line: header
            products.shift();
            console.log(products);
            Product.insertMany(products, (err, res) => { if (err) throw err; });
        });
        stream.pipe(csvStream);
        // res.send({success : "Data imported successfully.", status : 200});
        res.render('importCSV', { message: 'Data imported successfully.', title: 'importing CSV'});
    } catch(err) {
        // res.send({error: "Getting error on importing CSV", status : 403});
        res.render('importCSV', { message: 'Error on importing CSV', title: 'importing CSV'});
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).limit(50);
        // res.send({success : "Fetched successfully", status : 200, data: products});
        res.render('products', { products: products, title: 'All Products' });
    } catch(err) {
        // res.send({error: "Error on getting products", status : 403});
        res.render('404', { title: 'Blog not found' });
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById({_id: id});
        res.render('product', {product: product, title: 'product details'});
    } catch(err) {
        res.render('404', {title: 'Product not found'});
    }
}


module.exports = {
    importCSV,
    getProducts,
    updateProduct,
    aggregateProducts,
    updateProduct_get,
    getProduct
}