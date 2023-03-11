const users = require(`${__dirname}/Model`);

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const secret = 'sumithrajpurohit';


exports.GetRequest = async (req,res) => {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
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
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
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
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
        const {Email, Password} = req.body;
        console.log(Email,Password)
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

        const Token = jwt.sign({ userId: Data._id, email: Data.Email }, secret);


        res.status(201).json({
            status: 201,
            UserName : Data.UserName,
            id: Data._id,
            Token
        })
    }catch(err){
        res.status(404).json({status:err});
    }
}

// Get todo list handler
exports.GetTodoList = async (req,res) => {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
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
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
        const {id, text} = req.body;
        const taskData = {
            Todo: text
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
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
        const {id, element, index} = req.body;
        console.log("data is ",id,element, index);
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
        res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
        const {done, note, id, user} = req.body;
        await users.findOneAndUpdate(
            { _id: user, 'Task._id': id },
            {$set: {'Task.$.isCompleted': done, 'Task.$.Note': note}}
        ).then(() => console.log("Task updated"))
            .catch((err) => console.log(err));
        res.status(202).json({
            status:"update request sucess"
        })
    }catch(err){
        res.status(404).json({status:"error"})
    }
}