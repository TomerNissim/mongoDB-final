require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("monogo connected- exercise")})
.catch(()=>{console.log("monogo is not connected")})
const exerciseSchema = new mongoose.Schema({
   
    description: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model("Exercise", exerciseSchema);