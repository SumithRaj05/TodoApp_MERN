const users = require(`${__dirname}/Model`);

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

exports.GetRequest = async (req,res) => {
    try{
        res.status(200).json({
            status:"get request sucess",
            data:"Index page"
        });
    }catch(err){
        res.status(404).json({status:err});
    }
}

// signup handler
exports.SignUpRequest = async (req,res) => {
    try{
        const {UserName, Email, Password} = req.body;
        // check if username and email exist already

        const isPresentUser = await users.findOne({UserName: UserName})
        const isPresentEmail = await users.findOne({Email: Email})
        
        if(isPresentUser){
            return res.status(203).json({
                status:"UserName already exist"
            })
        }

        if(isPresentEmail){
            return res.status(203).json({
                status:"Email already exist"
            })
        }

        // create a salt and hash password accordingly

        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(Password, salt);
        
        // create user
        const data = await users.create({
            UserName: UserName,
            Email: Email,
            Password: hashedPwd
        })

        return res.status(200).json({
            status:200,
            id: data._id,
            UserName: data.UserName
        });

    }catch(err){
        res.status(404).json({status:err});
    }
}

// Login handler
exports.LogInRequest = async (req,res) => {
    try{
        const {Email, Password} = req.body;

        const Data = await users.findOne({Email: Email});
        // if no email found
        if(!Data){
            return res.status(404).json({
                status:"Email is not registered"
            })
        }

        const isMatch = await bcrypt.compare(Password, Data.Password);

        // if incorrect password
        if(!isMatch){
            return res.status(203).json({
                status:"Incorrect Password"
            })
        }

        res.status(201).json({
            status: 201,
            UserName : Data.UserName,
            id: Data._id
        })
    }catch(err){
        res.status(404).json({status:err});
    }
}

// Get todo list handler
exports.GetTodoList = async (req,res) => {
    try{
        const Data = await users.findById(req.params.id);
        return res.status(201).json({
            status:201,
            Task : Data.Task,
            isComplete: Data.isComplete
        });
    }catch(err){
        res.status(404).json({status:err});
    }
}

// add Task List
exports.AddTodoRequest = async (req,res) => {
    try{
        const {id, text} = req.body;
        await users.findByIdAndUpdate(id,{
            $push: {Task: text}
        });
        res.status(201).json({
            status:"sucess"
        })
    }catch(err){
        res.status(404).json({status:err})
    }
}

// Delete Task
exports.DeleteTodo = async (req,res) => {
    try{
        const {id, element} = req.body;
        console.log("data is ",id,element);
        await users.findByIdAndUpdate(id, {
            $pull: {Task : {$in: [element]}}
        }).then(() => console.log("Task deleted"))
            .catch((err) => console.log(err));
        res.status(200).json({
            status:"id delete request sucess"
        });
    }catch(err){
        res.status(404).json({status:"error"});
    }
}
