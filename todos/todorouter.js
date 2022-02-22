let express = require('express');
let mongoose = require('mongoose');
let todoRouter = express.Router();
let todoshema = require('../shemas/todoshema');
let todomodel = new mongoose.model('todo', todoshema);


todoRouter.get('/', async (req, res) => {
    await todomodel.find().exec((err, data) => {
        if (err) {
            res.status(500).json({ message: "There was an Error" })
        } else {
            res.render('temp/index')
        }
    })

})

todoRouter.get('/table', async (req, res) => {
    await todomodel.find().sort({ date: -1 }).exec((err, data) => {
        if (err) {
            res.status(500).json({ message: "There was an Error" })
        } else {

            res.json({ data })
        }
    })

})

todoRouter.post('/checkname', async (req, res) => {
    // console.log(req.body);
    await todomodel.find({ title: req.body.title }).exec((err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            if(data.length===0) {
                res.json({success: true})
            }else{
                res.sendStatus(500)
            }
        }
    })

})

todoRouter.post('/', async (req, res) => {
    if (req.body.date === '') {
        req.body.date = new Date().toUTCString()

    }
    console.log(req.body)
    await todomodel.insertMany(req.body, (err) => {

        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

todoRouter.put('/', async (req, res) => {
    if (req.body.date === '') {
        req.body.date = req.body.presentdate
    }

    await todomodel.updateOne({ _id: req.body._id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date
        }
    }, (err) => {
        if (err) {
            res.send('0')
        } else {
            res.send('1')
        }
    })

})

todoRouter.delete('/', async (req, res) => {

    await todomodel.deleteMany({ _id: req.body._id }, (err) => {
        if (err) {

            res.send('0')
        } else {
            res.send('1')
        }
    })

})

module.exports = todoRouter