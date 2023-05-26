const app = require('./app');
const connectDB = require('./config/db');
const { serverPort } = require('./secret');



app.listen(serverPort, async() => {
  console.log(`Example app listening on port ${serverPort}`)
  await connectDB()
})

// mern-ecommerce

// Am0DIFNUotfk9XXz