// requirements
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const controller = require(`${__dirname}/modules/Controller`);

// initializing
dotenv.config({path:`${__dirname}/modules/.env`})
const port = 5000 || process.env.PORT;
const app = express();

// Middlewares
app.use(cors());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://srtaskmanager.netlify.app');
    next();
})
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routers
app.route('/')
    .get(controller.GetRequest)

app.route('/Signup')
    .post(cors(),controller.SignUpRequest)

app.route('/Login')
    .post(cors(),controller.LogInRequest)


app.route('/:id')
    .get(controller.GetTodoList)
    .post(controller.AddTodoRequest)
    .delete(controller.DeleteTodo)
    .patch(controller.UpdateTodo)

// Server listening
app.listen(port, (err) => {
    (err)?
        console.log("Error: ",err)
        :console.log(`Listening at https://localhost:${port}`)
})