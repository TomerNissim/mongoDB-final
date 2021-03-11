const express = require('express')
const app = express()
const User = require("./models/user")
const Exercise = require("./models/exercise")
const cors = require('cors')


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
  
app.post('/api/exercise/new-user',async (req, res) => {
  const {username} = req.body;
  const isExist = User.find({name: username});
    try{
      if(isExist){
        return res.status(400).send("user is already exist")
      }
      const newUser = new User({
        username: username
      });
  
      res.status(200).send(newUser);
    })
    }catch{
      return res.status(500).send(error: "problem with")
    }

});
app.post('/api/exercise/add',(req, res) => {
  const {userId, description, duration, date} = req.body;
  

  res.status(200).json({message: "hola"});

});
app.get('/api/exercise/users',(req, res) => {
  res.status(200).json({message: "hola"});

}); 
app.get('/api/exercise/log',(req, res) => {
  res.status(200).json({message: "hola"});

});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
