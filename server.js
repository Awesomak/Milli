const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const objectId = require("mongodb").ObjectID;

const app = express();

var db = mongoose.createConnection('mongodb://localhost:27017/questions', { useNewUrlParser: true });

app.use(bodyParser.json())

app.get('/api/question', (req,res) => {
  db.collection("questions").find({}, {right:0}).toArray(function(err, questions){
    res.send(questions)
  });
})

app.get('/api/results', (req,res) => {
  db.collection("results").find({}).toArray(function(err, result){
    res.send(result)
  });
})

app.get('/api/questions', (req,res) => {
  function rand(a,b) {
    return Math.random() - 0.2;
  }

  let questions = [];

  db.collection("questions").find({hard: "1"}).toArray(function(err, questionseasy){
    let easy1 = questionseasy.sort(rand)
    let easy = easy1.slice(0,4)
    for(q of easy) {
      delete q.right;
      questions.push(q);
    }
  });

  setTimeout(() => {
    db.collection("questions").find({hard: "2"}).toArray(function(err, questionsmid){
      let mid = questionsmid.sort(rand).slice(0,4);
      for(q of mid) {
        delete q.right;
        questions.push(q);
      }
    });
  },200)

  setTimeout(() => {
    db.collection("questions").find({hard: "3"}).toArray(function(err, questionhard){
      let hard = questionhard.sort(rand).slice(0,4);
      for(q of hard) {
        delete q.right;
        questions.push(q);
      }
      res.send(questions)
    });
  },400)
})

app.post('/api/right/:id', (req,res) => { 
  var id = new objectId(req.params.id);    
  var right = req.body.right;
  db.collection("questions").findOne({_id: id}).then(r => {
    console.log(r.right,'---',req.body.right);
    if(r.right === right) {
      res.send(true);
    } else {
      res.send(false)
    }
  })
})

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

app.delete('/api/delete', (req,res) => {
  db.collection("questions").deleteMany({});
})

app.delete('/api/delete/:id', (req,res) => {
  var idgo = new objectId(req.params.id);  
  db.collection("questions").deleteMany({_id: idgo});
})

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

app.post('/api/result', (req, res) => {
  var name = req.body.name;
  var result = req.body.result;
  db.collection('results').insertOne({name: name, result: result});
})

const port = 5000;

app.listen(port, function() {
  console.log('ready to go!');
});