const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.send(categoryList);
})
// /!!!!!

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({ message: 'The category is not found' })
    }
    res.send(category);
})

// /!!!!!
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
        });
        await category.save()
        res.send(category);
    } catch (err) {
        console.log(err);
    }
})
// /!!!!!
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name
        },
        { new: true }
    )

    if (!category)
        return res.status(400).send('the category cannot be created!!')

    res.send(category)
})
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'the category is deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'the category is not found' })

        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})



module.exports = router;