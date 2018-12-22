const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

var db = mongoose.createConnection('mongodb://localhost:27017/questions', { useNewUrlParser: true });

app.use(bodyParser.json())

app.get('/api/question', (req,res) => {
  db.collection("questions").find({}).toArray(function(err, questions){
    res.send(questions)
  });
})

app.get('/api/questions', (req,res) => {
  db.collection("questions").find({hard: 1}).limit(5).toArray(function(err, questionseasy){
    res.send(questionseasy)
  });
})

app.post('/api/question', (req, res) => {
  var hard = req.body.hard;
  var quest = req.body.quest;
  var answer1 = req.body.answer1;
  var answer2 = req.body.answer2;
  var answer3 = req.body.answer3;
  var answer4 = req.body.answer4;
  var right = req.body.right;
  console.log("added");
  var newquest = {hard: hard, question: quest, answers: { answer1: answer1, answer2: answer2, answer3: answer3, answer4: answer4 }, right: right};
  db.collection('questions').insertOne(newquest);
})

const port = 5000;

app.listen(port, function() {
  console.log('ready to go!');
});