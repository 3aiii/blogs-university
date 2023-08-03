const express = require('express')
const conn = require('./db/conn')
const post = require('./routes/post')
const auth = require('./routes/auth')
const category = require('./routes/category')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 5000

// Add the middleware to connect frontend side with cors
app.use(cors())
// Add the middleware in express for covert data from json to js object
app.use(express.json())
// Add the middleware in express for active document in folder /img to become static
app.use('/img', express.static(path.join(__dirname, '/img')));

app.use('/api/Post',post)
app.use('/api/Auth',auth)
app.use('/api/Category',category)

// connect db
conn.connect((err)=>{
    if (err){
        console.log(err);
    }
    console.log('My sql is running right now !');
})

// connect server 
app.listen(port,() =>{
    console.log(`Server started already by port ${port}`);
})