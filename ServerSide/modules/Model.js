const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/.env`});

const DataBase = process.env.MONGO_URL;

mongoose.set('strictQuery', false);

mongoose.connect( DataBase, {useNewUrlParser: true}).then(con => {
    console.log("DataBase Connected!!")
})

const Schema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, "Name is required"]
    },
    Email: {
        type: String,
        required: [true, "Email is required"]
    },
    Password: {
        type: String,
        required: [true, "Password is required"]
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
    Task: [{
        Todo: {
            type: String,
            default: ""
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        Note: {
            type: String,
            default: ""
        }
    }]
})

const Users = mongoose.model('users', Schema);

module.exports = Users;