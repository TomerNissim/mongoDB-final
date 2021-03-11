require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("monogo connected - user")})
.catch(()=>{console.log("monogo is not connected")})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("User", userSchema);