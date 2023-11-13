const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 5050;
const mongoose = require('mongoose');
require('dotenv/config')


const mongoDBUrl = process.env.DBURL
// custom middlewares
app.set('view engine', 'ejs')
// app.use((req,res,next)=>{
//     console.log('New Request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next()
// })

app.use(morgan('dev'))
app.use(express.static('public'))


// routes
// app.get('/',(req,res)=>{
//     res.send('Welcome Home')
// })

const tasks = [
    {name:"halimat", title: 'halimats clothing',
    tasks:'client deliveries this morning'},
    {name:"Tolu", title: 'I.T experience',
    tasks:'To give my instructor my log book'},
    {name:"Steve", title: 'New house alert',
    tasks:'show client a new house'},
]
app.get('/',(req,res)=>{
    res.render('index',{title:'Home || Page',tasks})
})

app.get('/about', (req,res)=>{
    res.render('about',{title:'About || Page'})
    
})
app.get('/tasks', (req,res)=>{
    res.render('tasks', {title:'New Tasks'})

})
app.use( (req,res)=>{
    res.render('404',{title:'ERROR'})

})

// db connection
mongoose.connect(mongoDBUrl)
.then (()=> console.log('connected successfully!'));

app.listen(PORT,()=>{
    console.log(`server connected to http://localhost:${PORT}`);
})