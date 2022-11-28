const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    cin: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

// etudiantSchema.virtual('id').get(function () {
//     return this.id.toHexString();
// })
// etudiantSchema.set('toJSON', {
//     virtuals: true,
// })



exports.User = mongoose.model('User', userSchema);
