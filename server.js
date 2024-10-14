const mongoose= require('mongoose')
require('dotenv').config()
const app=require('./app')
const DB=process.env.MONGO_URI
mongoose.connect(DB).then(()=>{
    console.log('connected to MongoDB')
})

const port=process.env.PORT || 3000
const server=app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
