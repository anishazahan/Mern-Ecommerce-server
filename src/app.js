
const express = require('express');
const app = express();
const morgan = require("morgan");
const createError = require('http-errors')
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./Router/userRouter');
const seedRouter = require('./Router/seedRouter');
const { errorResponse } = require('./Controller/responseController');


//  rate limit define

const limiter = rateLimit({
	windowMs: 1* 60 * 1000, // 1 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:"To many request from this IP. Please try again later"
})


// use middleware----
app.use(limiter)
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/users",userRouter)
app.use("/api/seed",seedRouter)



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


//  with middleware api-----
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
    return errorResponse(res,{
        statusCode:err.status,
        message:err.message
    });
  })


  module.exports = app;







