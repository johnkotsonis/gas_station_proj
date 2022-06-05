










const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: './.env' })

//defining db
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//create public folder
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

//grabing data as json
app.use(express.urlencoded({extended:false}))
app.use(express.json());



//templates
app.set('view engine','hbs');

//db connection msg
db.connect( (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySQL connected...")
    }
    
})
//routes
app.use('/', require('./routes/pages'))

app.use("/auth", require('./routes/auth'))


app.listen(5000  ,()=>{
    console.log("testtt")
})


// import express from 'express'
//Handlebars (https://www.npmjs.com/package/express-handlebars)
// import { engine } from 'express-handlebars';
// const app = express()
// const router = express.Router();

//Δηλώνουμε πως ο φάκελος public θα περιέχει τα στατικά αρχεία
//π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει 
//το αρχείο /public/style.css
app.use(express.static('public'))

//Χρήση της Handlebars σαν template engine
//Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname 
//(το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// app.engine('hbs', engine({ extname: 'hbs' }));

//Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
// app.set('view engine', 'hbs');

//Task model - το μοντέλο δεδομένων μας είναι αποθηκευμένο στη RAM
let tasks = [
    { "id": 1, "task": "Να βρω σφάλματα", "status": 0, "created_at": "2022-05-07 09:08:10" },
    { "id": 2, "task": "Να ξαναδώ τον κώδικα", "status": 0, "created_at": "2022-05-10 23:50:40" },
    { "id": 3, "task": "Να διορθώσω τα σφάλματα", "status": 1, "created_at": "2022-05-10 23:50:40" },
    { "id": 4, "task": "Να αναμορφώσω τον κώδικα", "status": 1, "created_at": "2022-05-10 23:50:40" },
    { "id": 5, "task": "Να πάω για μπύρες", "status": 1, "created_at": "2022-05-10 23:50:50" }
]

let getAllTasks = function (callback) {
    callback(null, tasks);
};

//Controller - όλη η λογική που χρειάζεται να υλοποιεί ο εξυπηρετητής

//Θα πρέπει να επιστρέφει ένα task ανάλογα με το id του
let getTaskById = function (taskId, callback) {
    let task = { "id": taskId, "task": "Να βρω σφάλματα", "status": 1, "created_at": "2022-05-07 09:08:10" };
    callback(null, task);
};

//Απαντάει σε αίτημα για όλα τα tasks
let listAllTasks = function (req, res) {
    getAllTasks(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        // console.log('res', tasks);
        res.send(tasks);//στέλνει το object
    });
};

//Απαντάει σε αίτημα για συγκεκριμένο task
let listSingleTask = function (req, res) {
    getTaskById(req.params.taskId, function (err, task) {
        if (err) {
            res.send(err);
        }
        // console.log('res', task);
        res.send(task);//στέλνει το object
    });
}

//Δημιουργεί την σελίδα που φορτώνεται την 1η φορά στον φυλλομετρητή 
let listAllTasksRender = function (req, res) {
    getAllTasks(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        // console.log('tasks', tasks);
        // στέλνει το object tasks στο template "tasks-static"
        res.render('tasks-static', { ergasies: tasks }); 
    });
}

/* Χρησιμοποίησε τις διαδρομές που υπάρχουν στο  router */
// app.use(router); //load the router 'routes' on '/'

// router.route('/api/tasks').get(listAllTasks);
// router.route('/').get(listAllTasksRender);
// router.route('/toggleTask').get((doToggleTask1));
// router.route('/addTask').get((doToggleTask2));
// router.route('/removeTask').get((doToggleTask3));

function doToggleTask1(req, res)  {
    // console.log(req.query.taskId)
    
    console.log(req.query.taskName)
    for(let item  of tasks) {
        if (item.id == req.query.taskId){
            
            item.status = !item.status;
            // tasks.push
            break;
        }
    }
    res.render('tasks-static', { ergasies: tasks }); 
}

let counter = 5;
function doToggleTask2(req, res)  {
    // console.log(req.query.taskId)
    counter++;
    tasks.push({ "id": counter, "task": req.query.taskName, "status": 0, "created_at": "2022-05-10 23:50:50" })
    res.render('tasks-static', { ergasies: tasks }); 
}

function doToggleTask3(req, res)  {
    tasks = tasks.filter(x=>x.id!=req.query.taskId)
    res.render('tasks-static', { ergasies: tasks }); 
}
//
/* Επίσης έτσι: */
// app.route('/api/tasks').get(listAllTasks);
// app.route('/').get(listAllTasksRender);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

