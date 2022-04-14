const express =require("express");
const mongoose =require("mongoose");
const app=express();



const bodyParser =require("body-parser");
const cookieParser =require("cookie-parser");
const cors =require("cors");
require("dotenv").config();


// db connection
mongoose.connect(process.env.DATABASE,{}).then(()=> {
    console.log('DB IS CONNECTED')
}).catch((e)=>{
    console.log('UNIABLE TO CONNECT TO DB'+e);
});

// using parser middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Using routes
app.use('/api/v1/users',require("./src/routes/user"));
app.use('/api/v1/businesses',require("./src/routes/business"));
app.use('/api/v1/products',require("./src/routes/product"))


const port= process.env.PORT || 8000;

// starting the server
app.listen(port,()=>{
    console.log(`Server is Running at port:${port}`);
});
