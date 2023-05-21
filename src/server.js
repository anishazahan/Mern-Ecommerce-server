
const express = require('express');
const app = express();
const morgan = require("morgan");
const port = 5000


app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send('Hello World!xcvxb')
})
app.post('/', (req, res) => {
  res.send('post method')
})
app.put('/', (req, res) => {
  res.send('put method')
})
app.delete('/', (req, res) => {
  res.send('delete method')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})