const express=require('express');
const app=express();
const mongoose=require('mongoose');
const helmet=require('helmet');
const user_route=require('./route/user_route');
const like_route=require('./route/like_route');
const match_route=require('./route/match_route');
const filter_route=require('./route/filter_route');

app.use(express.json());
app.use(user_route);
app.use(filter_route);
app.use(like_route);
app.use(match_route);

mongoose.connect("mongodb+srv://Sanskar:Dmart%40123456@cluster0.b6gpvx2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("DB Connected");
}).catch(
    console.log("Failed to Connect")
);
app.listen(3000,()=>{
    console.log("Server Started");
});