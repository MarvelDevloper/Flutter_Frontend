const express=require('express');
const filterController = require('../controller/filterController');
const filter_route=express.Router();

filter_route.get('/filter-matches',filterController.get_matches);

module.exports=filter_route;