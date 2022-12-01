const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', async(request, response) => {
    const { email, password, name, lastname, keyword } = request.body
     
    try{
        if(await userModel.findOne({ email }))
            return response.status(400).send({ error: 'User already exists.'});

        const registerData = {
            email: email,
            password: await bcrypt.hash(password, 10),
            name: name,
            lastname: lastname,
            keyword: keyword
        }

        const user = await userModel.create(registerData);

        return response.status(200).send({ 
            id: user._id,
            name: user.name,
            learnPoints: user.learnPoints,
            level: user.level,
            purchasesHistoric: user.purchasesHistoric,
            desafio1: user.desafio1,
            desafio2: user.desafio2,
            desafio3: user.desafio3,
            desafio4: user.desafio4,
            desafio5: user.desafio5,
        });
    } catch(err){
        console.log(err);
        return response.status(400).send({ error: 'Registration failed'});
    }
})

router.get('/login', async(request, response) => {
    const {email, password} = request.query;
    //const {email, password} = request.body;
    
    try{
        //const user = await userModel.findOne({ email }).select('+password');
        console.log('oi');
        const user = userModel.find({ email: email }).select('+password');

        if(!user)
            return response.status(400).send({ error: 'User not found' });

        if(!await bcrypt.compare(password, user.password))
            return response.status(400).send({ error: 'Invalid password!'});

        user.password = undefined;

        return response.status(200).send({
            id: user._id,
            name: user.name,
            learnPoints: user.learnPoints,
            level: user.level,
            purchasesHistoric: user.purchasesHistoric
        });
    } catch(err) {
        return response.status(404).send({ 
            error: 'Unexpected error ocurred. Please try again later.',
            message: err
        });
    }
})

router.post('/changepassword', async(request, response) => {
    const {email, name, lastname, keyword, password} = request.body;        

    try {
        const user = await userModel.findOne({ email })
        if(
            user.email !== email ||
            user.name !== name ||
            user.lastname !== lastname ||
            user.keyword !== keyword
        )
            return response.status(404).send({ error: 'Invalid data!'})
        
        const newPass = await bcrypt.hash(password, 10)

        userModel.findOneAndUpdate({_id: user._id}, { password: newPass }, err => {
            if(err) return response.status(400).send({ error: 'Error to update user account'})
            return response.status(200).send({ error: 'Account updated'})            
        })
    } catch (err) {
        console.log(err)
        return response.status(404).send({ error: 'Unexpected error ocurred. Please try again later.'})
    }
})

router.post('/shop', async(request, response) => {
    const { email, productId, productName, productPrice } = request.body;

    try {
        const user = await userModel.findOne({ email })

        if(!user)
            return response.status(400).send({ error: 'Error to find user in DB'})

        if(user.learnPoints !== null && user.learnPoints < productPrice)
            return response.status(400).send({ error: 'Insufficient balance for purchase'})

        const newHistoric = {
            productId: productId,
            productName: productName,
            productActivationCode: 'XXX',
            purchaseDate: Date.now()
        }
        
        const updateHistoric = [...user.purchasesHistoric, newHistoric]    

        userModel.findOneAndUpdate({_id: user._id}, {
            purchasesHistoric: updateHistoric,
            learnPoints: user.learnPoints - productPrice
        }, err => {
            if(err) return response.status(400).send({ error: 'Error to complete purchase'})
            return response.status(200).send({ message: 'Purchase completed', learnPoints: user.learnPoints - productPrice })            
        })
    } catch (error) {
        return response.status(404).send({ 
            error: 'Unexpected error ocurred. Please try again later',
            trueError: error})
    }
})

router.post('/givepoints', async(request, response) => {
    const { email, points } = request.body;

    try {
        const user = await userModel.findOne({ email })

        if(!user && user.learnPoints !== null)
            return response.status(400).send({ error: 'Error to find user in DB'})

        userModel.findOneAndUpdate({_id: user._id}, {
            learnPoints: user.learnPoints + points
        }, err => {
            if(err) return response.status(400).send({ error: 'Error to add points to user account. Contact the support!'})
            return response.status(200).send({ message: 'Points add', learnPoints: user.learnPoints + points })            
        })
    } catch (error) {
        return response.status(404).send({ 
            error: 'Unexpected error ocurred. Please try again later',
            trueError: error})
    }
})

router.post('/completechallenge', async(request, response) => {
    const { email, desafio } = request.body;

    try{
        const user = await userModel.findOne({ email })

        if(!user && user.learnPoints !== null)
            return response.status(400).send({ error: 'Error to find user in DB'})

        if(desafio === 1){
            userModel.findOneAndUpdate({_id: user._id}, {
                desafio1: true
            }, err => {
                if(err) return response.status(400).send({ error: 'Error to complete challenge. Contact the support!'})
                return response.status(200).send({ message: 'Challenge completed', desafio1: true })            
            }) 
        }

        if(desafio === 2){
            userModel.findOneAndUpdate({_id: user._id}, {
                desafio2: true
            }, err => {
                if(err) return response.status(400).send({ error: 'Error to complete challenge. Contact the support!'})
                return response.status(200).send({ message: 'Challenge completed', desafio2: true })            
            }) 
        }

        if(desafio === 3){
            userModel.findOneAndUpdate({_id: user._id}, {
                desafio3: true
            }, err => {
                if(err) return response.status(400).send({ error: 'Error to complete challenge. Contact the support!'})
                return response.status(200).send({ message: 'Challenge completed', desafio3: true })
            }) 
        }

        if(desafio === 4){
            userModel.findOneAndUpdate({_id: user._id}, {
                desafio4: true
            }, err => {
                if(err) return response.status(400).send({ error: 'Error to complete challenge. Contact the support!'})
                return response.status(200).send({ message: 'Challenge completed', desafio4: true })            
            }) 
        }

        if(desafio === 5){
            userModel.findOneAndUpdate({_id: user._id}, {
                desafio5: true
            }, err => {
                if(err) return response.status(400).send({ error: 'Error to complete challenge. Contact the support!'})
                return response.status(200).send({ message: 'Challenge completed', desafio5: true })            
            }) 
        }

    } catch (err){
        return response.status(404).send({ 
            error: 'Unexpected error ocurred. Please try again later',
            trueError: err})
    }
})

module.exports = app => app.use('/auth', router);