const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    level: {
        type: Number,
        default: 0
    },
    learnPoints: {
        type: Number,
        default: 15000
    },
    keyword: {
        type: String,
        required: true
    },
    purchasesHistoric: [
        {
            productId: {
                type: String
            },
            productName: {
                type: String
            },
            productActivationCode: {
                type: String
            },
            purchaseDate: {
                type: Date
            }
        }
    ],
    desafio1: {
        type: Boolean,
        default: false
    },
    desafio2: {
        type: Boolean,
        default: false
    },
    desafio3: {
        type: Boolean,
        default: false
    },
    desafio4: {
        type: Boolean,
        default: false
    },
    desafio5: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);