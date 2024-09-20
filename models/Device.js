const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    brand: {
        type: String,
        minLength: 2,
        required: true
    },
    model: {
        type: String,
        minLength: 5,
        required: true
    },
    hardDisk: {
        type: String,
        minLength: 5,
        required: true
    },
    screenSize: {
        type: String,
        minLength: 1,
        required: true
    },
    ram: {
        type: String,
        minLength: 2,
        required: true
    },
    operatingSystem: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    },
    cpu: {
        type: String,
        minLength: 10,
        maxLength: 50,
        required: true
    },
    gpu: {
        type: String,
        minLength: 10,
        maxLength: 50,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    color: {
        type: String,
        minLength: 2,
        maxLength: 10,
        required: true
    },
    weight: {
        type: String,
        minLength: 1,
        required: true
    },
    image: {
        type: String,
        match: /^https?:\/\/\S+$/,
        required: true
    },
    preferredList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdAt: Date,
});

deviceSchema.pre('save', function () {
    if(!this.createdAt) {
        this.createdAt = Date.now();
    }
})
const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;