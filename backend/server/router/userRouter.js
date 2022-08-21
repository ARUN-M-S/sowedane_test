const route = require('express').Router()
const { Router } = require('express');
const {registration, login, verification,userProfile,updateProfile} = require('../controller/userController')

route.post('/', registration);
route.post('/login', login);
route.get('/:id/verify/:token', verification);
route.get('/home/:id',userProfile);
route.post('/update/:id',updateProfile)

module.exports = route;