const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');






router.get('/get', async (req, res) => {
    const productList = await Product.find();
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})

router.get('/getById/:id', async (req, res) => {
    const productList = await Product.findById(req.params.id);
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')
    const product = await Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            countInStock: req.body.countInStock,
            image: req.body.image,
            stockMin: req.body.stockMin,
            featured: req.body.featured
        },
        { new: true }
    )

    if (!product)
        return res.status(400).send('the product cannot be created!!')

    res.send(product)
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the category is deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'the category is not found' })

        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments((count) => count)
    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        productCount: productCount
    });
});
router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ featured: true }).limit(+count)
    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products);
});
router.get('/', async (req, res) => {
    let filtre = {};
    if (req.query.categories) {
        filtre = { categorie: req.query.categories.split(',') }
    }
    const productList = await Product.find(filtre);

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});



// !!!!!!
router.post('/add', async (req, res) => {
    // const category = await Category.findById(req.body.category)
    // if (!category) return res.status(400).send('Invalid Category')
    try {
        let product = new Product({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            countInStock: req.body.countInStock,
            image: req.body.image,
            stockMin: req.body.stockMin,
            featured: req.body.featured
        });
        await product.save()
        res.send(product);
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;