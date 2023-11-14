// require mongoose
// from mongoose, we would use a method called schema.This defines the structure of the document that we would store in the collection.model is uded to wrap the schema and then sends it to the DB


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema =  new Schema({
    name:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    task:{
        type:String,
        require:true
    }
},{timestamps:true})

// letts create awa model (Model is with surrounds the schema and provides us with an interface by which to communicate with awa database)

const TASKS = mongoose.model('Task',taskSchema);
module.exports = TASKS 