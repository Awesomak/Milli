const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const objectId = require("mongodb").ObjectID;

const app = express();


//DataBase connection
var db = mongoose.createConnection('mongodb+srv://awesomak:000123321@cluster0-0n7tq.mongodb.net/test?retryWrites=true');


  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

app.use(bodyParser.json())


//GET section------------------------------------------------------------------------------------------------------------------------------------------

//All question send
app.get('/api/question', (req,res) => {
  db.collection("questions").find({}, {right:0}).toArray(function(err, questions){
    res.send(questions)
  });
})

//All results send
app.get('/api/results', (req,res) => {
  db.collection("results").find({}).toArray(function(err, result){
    res.send(result)
  });
})

//Questions for game session
app.get('/api/questions', (req,res) => {
  function rand(a,b) {
    return Math.random() - 0.2;
  }

  var questions = [];

  //Pick 4 random question from input array
  RandomChoose = (array) => {
    let quest = array.sort(rand)
    let quest_ready = quest.slice(0,4)
    for(q of quest_ready) {
      delete q.right;
      questions.push(q);
    }
  }

  db.collection("questions").find({hard: "1"}).toArray(function(err, questionseasy){
    RandomChoose(questionseasy);
  });

  setTimeout(() => {
    db.collection("questions").find({hard: "2"}).toArray(function(err, questionsmid){
      RandomChoose(questionsmid);
    });
  },200)

  setTimeout(() => {
    db.collection("questions").find({hard: "3"}).toArray(function(err, questionhard){
      RandomChoose(questionhard);
      res.send(questions)
    });
  },400)
})

//POST session------------------------------------------------------------------------------------------------------------------------------------------

//Check result
app.post('/api/right/:id', (req,res) => { 
  var id = new objectId(req.params.id);    
  var right = req.body.right;
  db.collection("questions").findOne({_id: id}).then(r => {
    console.log(r.right,'---',req.body.right);
    r.right === right ? res.send(true) : res.send(false)
  })
})

//Add new question
app.post('/api/question', (req, res) => {
  var hard = req.body.hard;
  var quest = req.body.quest;
  var answer1 = req.body.answer1;
  var answer2 = req.body.answer2;
  var answer3 = req.body.answer3;
  var answer4 = req.body.answer4;
  var right = req.body.right;
  var newquest = {hard: hard, question: quest, answers: { answer1: answer1, answer2: answer2, answer3: answer3, answer4: answer4 }, right: right};
  db.collection('questions').insertOne(newquest);
})

//Tips section------------------------------------------------------------------------------------------------------------------------------------------

//50-50 tip
app.post('/api/help/fifty', (req, res) => {
  var answers = req.body.answers;
  var id = new objectId(req.body.id);
  db.collection("questions").findOne({_id: id}).then(r => {
    //Remove right answer
    var newrig = answers.filter(e => {
        return e != r.right
    })
    newrig.splice(Math.floor(Math.random() * newrig.length),1)
    res.send(newrig);
  })
})

//Right answer tip
app.post('/api/help/right/:id', (req, res) => {
  var id = new objectId(req.params.id);
  db.collection("questions").findOne({_id: id}).then(r => {
    res.send(r);
  })
})

//Hall assistance tip
app.post('/api/help/assistance/:id', (req, res) => {
  var id = new objectId(req.params.id);
  var answers = req.body.answers;
  var resultats = [0,0,0,0];
  db.collection("questions").findOne({_id: id}).then(r => {
    var procent = 100;
    var s = 1;
    for (let i = 0; i < 4; i++) {
      if (answers[i] === r.right) {
        let mm = Math.floor(Math.random() * (41) + 50);
        procent -= mm;
        resultats[i] = mm
      } 
    }
    for (let i = 0; i < 4; i++) {
      if (answers[i] != r.right) {
        if (s === 3) {
          resultats[i] = procent
        } else {
          let mm = Math.floor(Math.random() * procent);
          procent -= mm;
          resultats[i] = mm
          s++
        }
      } 
    }
    res.send(resultats);
  })
})

//Add result
app.post('/api/result', (req, res) => {
  var name = req.body.name;
  var result = req.body.result;
  db.collection('results').insertOne({name: name, result: result});
})

//PUT/DELETE section------------------------------------------------------------------------------------------------------------------------------------------

//Edit question
app.put('/api/question/:id', (req,res) => { 
  var idgo = new objectId(req.params.id);    
  var hard = req.body.hard;
  var quest = req.body.quest;
  var answer1 = req.body.answer1;
  var answer2 = req.body.answer2;
  var answer3 = req.body.answer3;
  var answer4 = req.body.answer4;
  var right = req.body.right;
  console.log(idgo);
  
  db.collection("questions").findOneAndUpdate({_id: idgo}, { $set: {hard: hard, question: quest, answers: { answer1: answer1, answer2: answer2, answer3: answer3, answer4: answer4 }, right: right}});
})

//Selete question
app.delete('/api/delete/:id', (req,res) => {
  var idgo = new objectId(req.params.id);  
  db.collection("questions").deleteMany({_id: idgo});
})

/* Developer needs
app.put('/api/questionupdate', (req,res) => {
  db.collection("questions").find({}, {right:0}).toArray(function(err, questions){
    for(let i = 0; i < questions.length; i++) {
    var idgo = new objectId(questions[i]._id);
    db.collection("questions").findOneAndUpdate({_id: idgo}, { $set: {answers: questions[i].answersUpdate}});
    }
  });

})

app.delete('/api/delete', (req,res) => {
  db.collection("questions").deleteMany({});
})
*/

const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('server is ready on port - ' + port);
});