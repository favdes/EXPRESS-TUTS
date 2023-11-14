const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 5050;
// const mongoose = require('mongoose');
require('dotenv/config')
const connect = require ('./db/mongoDB.js')
const TASKS = require('./model/taskModel.js')



// custom middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
// app.use((req,res,next)=>{
//     console.log('New Request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next()
// })

// TESTING OUR MODEL AND DATABASE
// .save method is a mongoose method for saving data to our database
app.get('/post-task',async(req,res)=>{
    const testData = new TASKS({
        name:'VICTOR',
        title:'FRONT-END',
        task:'LEARNING FULL STACK'
    })
    try{
        const newTask = await testData.save();
        res.status(201).send(newTask)
    }catch(error){
        console.log(error);
    }
    

})

// .find() method is a mongoose method for getting all data from our database.
  app.get('/get-post',async(req,res)=>{
    try{
        const getTasks =await TASKS.find();
        res.status(200).send(getTasks)

    }catch(error){
        console.log(error);
    }
  })

//   .findById() method is a mongoose method for finding a specific data from our database.
        
app.get('/single-task',async(req,res)=>{
    try{
        const singleTask =await TASKS.findById
        ("65522ecab28f096ff00c0224") 
        res.status(200).send(singleTask)
    }catch(error){
        console.log(error);
    }
})
// END OF DATABASE TEST

app.use(morgan('dev'))
app.use(express.static('public'))


// routes
// app.get('/',(req,res)=>{
//     res.send('Welcome Home')
// })


// const tasks = [
//     {name:"halimat", title: 'halimats clothing',
//     tasks:'client deliveries this morning'},
//     {name:"Tolu", title: 'I.T experience',
//     tasks:'To give my instructor my log book'},
//     {name:"Steve", title: 'New house alert',
//     tasks:'show client a new house'},
// ]

// api
app.post('/api/v1/create',async(req,res)=>{
    const newTask = new TASKS(req.body)
    console.log(req.body);

    // ss.save()
    // .then((result)=>{
    // res.redirect('/')
    // })
    try{
        await newTask.save();
        res.status(201).redirect('/')
    }catch(error){
        console.log(error);
    }
});
// route params

app.get('/api/v1/route/:id',async(req,res)=>{
    const id = req.params.id
    console.log(id);
        try{
         await TASKS.findById(id)
         res.status(200).render('sinlepage', {title: 'single || pae',task:result})

        }catch(error){
            console.log(error);
        }
        
});


// page routes
app.get('/', async(req,res)=>{

    // TASKS.find()
    // .then((result))

    try{
        const result = await TASKS.find();
        res.render("index", {title: "Home || page", tasks:result});
    }catch(error){
        console.log(error);
    }
    
});

app.get('/about', (req,res)=>{
    res.render('about',{title:'About || Page'})
    
})
app.get('/tasks', (req,res)=>{
    res.render('tasks', {title:'New Tasks'})

})
app.get('/singlepage', (req,res)=>{
    res.render('singlepage', {title:'single || page'})

})
app.use( (req,res)=>{
    res.render('404',{title:'ERROR'})

})

// db connection
connect()
    .then(()=>{
        try{
            app.listen(port,()=>{
                console.log(`server connected to http://localhost:${port}`);
            })

        }catch(error){
            console.log('cannot connect to the server');
        }
    })

    .catch((error)=>{
        console.log('invalid database connection......!',error);
    })

