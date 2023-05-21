
const express = require('express');
const app = express();
const morgan = require("morgan");
const port = 5000


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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})