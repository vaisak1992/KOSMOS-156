const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()

app.use(cors({
    origin: ["https://www.test-project.xyz", "https://test-project.xyz"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

const route=require('./router/auth')
mongoose.connect(process.env.Mongodb_Url).then((data)=>{
    console.log('database connected');
}).catch((err)=>{
    console.log("error",err);
})
app.use(express.json())
app.use('/api/Cli',route)
app.listen(5000,()=>{
    console.log("port 5000 connected");
})
