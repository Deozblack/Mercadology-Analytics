const express = require('express');
const app = express();

// STATIC Files
app.use(express.static(__dirname + 'src/app/components/login'));


//const Task = require('./model/Task');

// settings
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create Task
app.post('/create',(req, res) => {

  console.log(req,body);
  res.send('Recibido');

  //const newTask = new Task({

      //task: req.body.task,
      //  description: req.body.description
   // });
    //await newTask.save();
    //res.redirect('/');
})

/*

app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {tasks });
})


*/
module.exports = app;
