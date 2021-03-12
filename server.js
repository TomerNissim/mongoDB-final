const express = require('express')
const app = express()
const User = require("./models/user")
const Exercise = require("./models/exercise")
const cors = require('cors')
const {urlencoded} = require("body-parser")

app.use(cors())
app.use(express.static('public'))
app.use(urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
  
app.post('/api/exercise/new-user', async (req, res) => {
  const {username} =  await req.body;
  console.log(username);
  console.log(req.body);


  const isExist = await User.find({username: username});

    try{
      if(isExist.length > 0){
        return res.status(400).send("user is already exist")
      }
      const newUser = new User({
        username: username
      });
      newUser.save()
      return res.status(200).send(newUser);
    }catch{
      return res.status(500).send({error: "problem with server"})
    }

});
app.post('/api/exercise/add',(req, res) => {
  console.log(req.body);

  const {userId, description, duration, date} = req.body;
  try{
    const newExercise = new Exercise({
      userId: userId,
      description: description,
      duration: duration,
      date: date,

    });
    newExercise.save();
    return res.status(200).send(newExercise);
  }catch{
    return res.status(500).send({error: "problem with server"})
  }


});
app.get('/api/exercise/users', async (req, res) => {
  const isExist = await User.find();
  res.status(200).send(isExist);

}); 
app.get('/api/exercise/log/:userId', async (req, res) => {
  try{

    const id = req.params.userId
    const userLog = await Exercise.findById(id);
    if(userLog !== null){
      userLog.count = userLog.count + 1;
      userLog.save();
      console.log(userLog.count);
      return res.status(200).send(userLog)
    }
    return res.status(400).json({error: "User wasn't found"});
  }catch{
    return res.status(500).send({error: "problem with server"})
  }

});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
