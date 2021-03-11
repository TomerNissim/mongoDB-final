require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Exercise", exerciseSchema);