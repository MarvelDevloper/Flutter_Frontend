const express=require('express');
const matchController = require('../controller/matchController');
const istokenValid = require('../controller/validtoken');
const match_route=express.Router();

match_route.patch('/add-to-match/:id',matchController.add_matches);
match_route.get('/show-matches/:id',matchController.show_matches);
match_route.patch('/remove-from-match/:id',matchController.remove_from_matchlist);

module.exports=match_route;