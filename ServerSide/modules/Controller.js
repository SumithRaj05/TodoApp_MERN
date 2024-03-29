const users = require(`${__dirname}/Model`);

const bcrypt = require('bcrypt');
const dotenv = require("dotenv")


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
            Task : Data.Task
        });
    }catch(err){
        res.status(404).json({status:err});
    }
}

// add Task List
exports.AddTodoRequest = async (req,res) => {
    try{
        const {id, text, Date} = req.body;
        const taskData = {
            Todo: text,
            DueDate: Date
        } 
        await users.findByIdAndUpdate(id,{
            $push: {Task: taskData}
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
        const {id, element, index} = req.body;
        await users.findByIdAndUpdate(id, {
            $pull: {Task : element}
        }).then(() => console.log("Task deleted"))
            .catch((err) => console.log(err));
        res.status(200).json({
            status:"id delete request sucess"
        });
    }catch(err){
        res.status(404).json({status:"error"});
    }
}

exports.UpdateTodo = async (req,res) => {
    try{
        const {done, note, id, user, dueDate} = req.body;
        await users.findOneAndUpdate(
            { _id: user, 'Task._id': id },
            {$set: {'Task.$.isCompleted': done, 'Task.$.Note': note, 'Task.$.DueDate': dueDate}}
        ).then(() => console.log("Task updated"))
            .catch((err) => console.log(err));
        res.status(202).json({
            status:"update request sucess"
        })
    }catch(err){
        res.status(404).json({status:"error"})
    }
}