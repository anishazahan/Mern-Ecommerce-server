
const express = require('express');
const app = express();
const morgan = require("morgan");
const createError = require('http-errors')
var xssClean = require('xss-clean')



app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const isLoggedIn =(req,res,next)=>{

    const user = true;
    if(user){
        req.body.id= 100;
        next()
    }else{
       return res.status(401).json({
            message:"unauthorized user"
        })
    }
 
}

app.get('/', (req, res) => {
  res.send('Hello World!xcvxb')
})

app.get('/api/user',isLoggedIn, (req, res) => {
    console.log(req.body.id);
  res.status(200).send({
    message:"user progile is login"
  })
})


// client error handeling--

app.use((req,res,next)=>{
//   res.status(404).json({
//     message:"route not found"
//   })


// createError()
//   next()

next(createError(404,"route not found"))
})

// server error  = all the errors

app.use((err, req, res, next) => {
    
    return res.status(err.status || 500).json({
        success:false,
        message:err.message,
    })
  })


  module.exports = app;