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
  const {username} =  req.body;
  const isExist = await User.find({username: username});
    try{
      if(isExist.length > 0){
        return res.status(400).send("user is already exist")
      }
      const newUser = new User({
        username: username
      });
      newUser.save((err, savedUser) => {
        if(!err){
          res.send({username : savedUser.username, _id: savedUser.id})
        }
      })
    }catch{
      return res.status(500).send({error: "problem with server"})
    }

});
app.post('/api/exercise/add',(req, res) => {
  const {userId, description, duration, date} = req.body;
  try{
    const newExercise = new Exercise({
      userId: userId,
      description: description,
      duration: duration,
      date: date,
    });
    if(newExercise.date ===""){
      newExercise.date = new Date().toISOString().substring(0,10);
    }
    User.findByIdAndUpdate(userId,
      {$push : {log: newExercise}},
      {new: true},
      (err, updatedUser) =>{
        res.send({_id: newExercise.id,
        username: newExercise.username,
        date: new Date(newExercise.date).toDateString(),
        description: newExercise.description,
        duration: newExercise.duration})
      })

    newExercise.save();
  }catch{
    return res.status(500).send({error: "problem with server"})
  }


});
app.get('/api/exercise/users', async (req, res) => {
  const arrayOfUsers = await User.find();
  res.status(200).send(arrayOfUsers);

}); 
app.get('/api/exercise/log/', async (req, res) => {
  try{
 
      User.findById(req.query.userId, (err, result) => {
        if(!err){
          let responseObj = result;
          responseObj.log = [];
          if(req.query.from || req.query.to ){
            let fromDate = new Date(0);
            let toDate = new Date();
            
            if(req.query.from){
              fromDate = new Date(req.query.from);
            }
            if(req.query.to){
              toDate = new Date(req.query.to);
            }
            fromDate = fromDate.getTime();
            toDate = toDate.getTime();
            responseObj.log = responseObj.log.filter((exercise) => {
              exerciseDate = new Date(exercise.date).getTime();
              return exerciseDate >= fromDate && exerciseDate <= toDate;
            })
            
          }

          if(req.query.limit){
            responseObj.log.slice(0, req.query.limit)
          }

          responseObj['count'] = result.log.length
          res.send(responseObj)
        }
      })
     }catch{
    return res.status(500).send({error: "problem with server"})
  }  
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
