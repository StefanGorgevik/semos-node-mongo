const modelUsers = require('../models/users');
//https://www.npmjs.com/package/node-input-validator
const validator  = require('node-input-validator');
const validatorUsers = require('../validators/users')


const register = (req, res) => {
    var v = new validator.Validator(req.body, validatorUsers.createUser); //1-payload, 2-schema for validation
    v.check() //returns a promise
    .then(matched => {
        if(matched) {
            return modelUsers.createUser(req.body);
        } else {
            throw new Error("Validation failed");
        }
    })
        .then(() => {
            return res.status(201).send("User created")
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(v.errors);
        })
    }

    const login = (req, res) => {
        return res.status(200).send("OK")
    }

    const renew = (req, res) => {
        return res.status(200).send("OK")
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