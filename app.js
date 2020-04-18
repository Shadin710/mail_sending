require('dotenv').config();
const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan =  require('morgan');
const {check,validationResult} = require('express-validator');
const path = require('path');
const nodemailer =  require('nodemailer');

app.use(express.static(path.join(__dirname +'./views')));

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/send',(req,res)=>{
    var trasporter = nodemailer.createTransport({
        service: 'gmail', //which service you want to use
        auth: {
            user: '', //give the email 
            pass: '' //give the email password
        }
    });
    var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    trasporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            return res.json({
                status: false,
                message: 'Error sending the mail',
                error: error.arrat()
            })
        }
        else
        {
            res.send('sent');
        }
    })

})

app.listen(port,(req,res)=>{
    console.log(`listening to ${port}.....`);
});