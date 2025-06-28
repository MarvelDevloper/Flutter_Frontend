const express=require('express');
const UserController = require('../controller/UserController');
const user_route=express.Router();

user_route.post('/signup',UserController.signup);
user_route.post('/login',UserController.login);
user_route.get('/get-profile/:id',UserController.profile);
user_route.patch('/update-profile/:id',UserController.update_profile);
user_route.patch('/update-bio/:id',UserController.update_bio);
user_route.get('/default-matches/:id',UserController.recommendate_matches);

module.exports=user_route;