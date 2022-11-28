const mongoose = require('mongoose');




const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'category',
        require: true,
    },
    description: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    image: {
        type: Number,
        required: true,
    },
    stockMin: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }

})




exports.Product = mongoose.model('Product', productSchema);
