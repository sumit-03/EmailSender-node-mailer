const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
require('dotenv').config()
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile("form.html", {root : __dirname + '/public'});
});

app.post("/form-end-point", (req, res, next) => {
    var name = req.body.name,
        address = req.body.address,
        occupation = req.body.occupation,
        email = req.body.email;

    // console.log(name + email);
    sendMail(res, name, address, occupation, email);
    // res.sendFile("success.html", {root : __dirname + '/public'});
});

async function sendMail(res, name, address, occupation, email) {
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: process.env.TestAccountUser,
            pass: process.env.TestAccountPass
        }
        
    });
    var mailOptions = {
        from: '"no reply" <Task29122020@gmail.com>',
        to: `${email}`,
        subject: 'Your Info',
        html: `<h3>Here is what You had Submitted<h3> <br>
            <b>Name: </b>${name} <br>
            <b>Address: </b>${address} <br>
            <b>Occupation: </b>${occupation} <br>`
    };
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.sendFile("error.html", {root : __dirname + '/public'});
            console.log(error);
        } else {
            res.sendFile("success.html", {root : __dirname + '/public'});
            console.log('Email sent: ' + info.response);
        }
    });
}


app.listen(process.env.PORT || 9000, function() {
    console.log("Server started on port ", process.env.PORT);
});
  