const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/', function(req, res, next) {
    let challenge = req.param("login_challenge")
    axios.get(`http://localhost/oauth2/auth/requests/login/${challenge}`)
    .then(axres => {
        res.render('login', {challenge: axres.data.challenge, message: JSON.stringify(axres.data, null, '    ')})
    })
    .catch(function(err) {
        next(err)
    })
})

router.post('/', function(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let challenge = req.body.challenge

    if (password == Array.from(username).reverse().join("")) {
        axios.put(`http://localhost/oauth2/auth/requests/login/${challenge}/accept`, {
            remember: false,
            subject: username
        }).then(function(axres) {
            res.redirect(axres.data.redirect_to)
        }).catch(function(err) {
            next(err)
        })
    } else {
        axios.put(`http://localhost/oauth2/auth/requests/login/${challenge}/reject`, {
            error: "authorize",
            error_description: "Error to find the username and password."
        }).then(function(axres) {
            res.redirect(axres.data.redirect_to)
        }).catch(function(err) {
            next(err)
        })
    }
})

module.exports = router