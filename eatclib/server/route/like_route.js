const express=require('express');
const like_controller = require('../controller/likeController');
const like_route=express.Router();

like_route.patch('/add-like/:id',like_controller.add_like);
like_route.patch('/remove-like/:id',like_controller.remove_like);
like_route.get('/get-like/:id',like_controller.getlike);

 module.exports=like_route;