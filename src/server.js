
require('dotenv').config()
const app = require('./app');

const port = process.env.SERVER_PORT || 5001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})