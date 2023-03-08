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
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://srtaskmanager.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
  

// Routers
app.route('/')
    .get(controller.GetRequest)

app.route('/Signup')
    .post(controller.SignUpRequest)

app.route('/Login')
    .post(controller.LogInRequest)


app.route('/:id')
    .get(controller.GetTodoList)
    .post(controller.AddTodoRequest)
    .delete(controller.DeleteTodo)

// Server listening
app.listen(port, (err) => {
    (err)?
        console.log("Error: ",err)
        :console.log(`Listening at https://localhost:${port}`)
})