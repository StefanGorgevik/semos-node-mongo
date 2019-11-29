
const mUsers = require('../models/users');
const vUsers = require('../validators/users');
//https://www.npmjs.com/package/node-input-validator
var validator = require('node-input-validator');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/index.js');

const register = (req, res) => {
    var v = new validator.Validator(req.body, vUsers.createUser);
    v.check()
    .then(matched => {
        if(matched) {
            bcrypt.genSalt(10, function(err, salt) {    //10 rounds, 10 pati vrti
                if(err){
                    throw new Error(err);
                    return;
                }
                bcrypt.hash(req.body.password, salt, function(err, hash) {  //hashuva pw so salt(gi mesha)
                    if(err){
                        throw new Error(err);
                        return;
                    }
                    return mUsers.createUser({...req.body, password: hash}); //od cel objekt od req.body go menjava samo pwto so hashuvan pw
                });
            });
        } else {
            throw new Error('Validation failed');
        }
    })
    .then(() => {
        return res.status(201).send('ok');
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(v.errors);
    });
}

const login = (req, res) => {
    mUsers.getUserPasswordByEmail(req.body.email)
    .then((data) => {
        bcrypt.compare(req.body.password, data.password, function(err, rez) {  //gi sporeduva pw so data i req.body
            if(err){
                return res.status(500).send('Could not compare password');
            }
            if(rez){
                var tokenData = {
                    id: data._id,
                    full_name: `${data.first_name} ${data.last_name}`,
                    email: data.email
                    //exp: new Date() za expire time
                };
                var token = jwt.sign(tokenData, config.getConfig('jwt').key); //zapisuva tokenData so kluch od config
                return res.status(200).send({jwt: token});
            }
            return res.status(404).send('not found');
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('Could not get user');
    });
};

    const renew = (req, res) => {
        return res.status(200).send(req.user)
    }

    const resetLink = (req, res) => {
        return res.status(200).send("OK")
    }

    const resetPassword = (req, res) => {
        return res.status(200).send("OK")
    }

    const changePassword = (req, res) => {
        return res.status(200).send("OK")
    }


    module.exports = {
        register,
        login,
        renew,
        resetLink,
        resetPassword,
        changePassword
    }