const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get("/", function (req, res, next) {
    let challenge = req.param('consent_challenge')

    axios.get(`http://localhost/oauth2/auth/requests/consent/${challenge}`).then(function (axres) {
        let data = axres.data
        res.render("consent", { challenge: data.challenge, message: JSON.stringify(data, null, '    ') })
    }).catch(function (err) {
        next(err)
    })
})

router.post("/", function (req, res, next) {
    let challenge = req.body.challenge
    let action = req.body.action

    axios.get(`http://localhost/oauth2/auth/requests/consent/${challenge}`).then(function (axres) {
        let data = axres.data
        if (action == "grant") {
            axios.put(`http://localhost/oauth2/auth/requests/consent/${challenge}/accept`, {
                grant_scope: data.requested_scope,
                remember: false,
                session: {
                    access_token: {
                        user: data.subject
                    }
                }
            })
            .then(axres => {
                res.redirect(axres.data.redirect_to)
            })
            .catch(err => next(err))
        } else {
            axios.put(`http://localhost/oauth2/auth/requests/consent/${challenge}/reject`, {
                error: "deny",
                error_description: "Owner has denied the access."
            })
            .then(axres => res.redirect(axres.data.redirect_to))
            .catch(err => next(err))
        }
    }).catch(function (err) {
        next(err)
    })

})

module.exports = router