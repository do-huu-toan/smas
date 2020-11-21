const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoClient = require('mongoose')

//Connect to mongodb by mongooose
mongoClient.connect('mongodb://localhost/myDatabase',{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Connect is succes!"))
    .catch((error) => console.error(`Error: ${error}`))

const app = express();

const userRoute = require('./routes/user.route')
//Middlewares
app.use(logger('dev')) //Return time request


//Routes
app.use(bodyParser.json());
app.use('/user', userRoute)
app.get('/', (req, res, next)=>{
    return res.status(200).json({
        message: 'Server is OK!'
    })
})

//Catch Error
app.use((req,res,next) =>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
//Error handle function
app.use(() => {
    const error = app.get(`env`) === 'development' ? err : {}
    const status = err.status || 500
    //response to client
    return res.status(status).json({
        err: {
            message: err.message
        }
    })
})

const port = app.get('port') || 3000

app.listen(port, () => console.log(`Server is listening on port ${port}`))