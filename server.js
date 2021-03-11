const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
  
app.post('/api/exercise/new-user',(req, res) => {
  const {username} = req.body;

  res.status(200).json({message: "hola"});
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
