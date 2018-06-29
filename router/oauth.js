const express = require('express')
const axios = require('axios')

const uuid = require('uuid/v4')

const queryString = require('query-string')

const client = require('../conf/client')

const router = express.Router()

router.get('/callback', (req, res, next) => {
    let code = req.param('code')
    let scope = req.param('scope')
    let state = req.param('state')

    let params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', client.redirect_uris[0])
    params.append('client_id', client.id)
    params.append('client_secret', client.client_secret)
    console.log(JSON.stringify(params, null, '    '))
    axios.post('http://localhost/oauth2/token', params)
        .then(axres => res.render('token', { message: JSON.stringify(axres.data, null, '    ') }))
        .catch(err => next(err))
})

router.get('/token/:token', (req, res, next) => {
    let params = new URLSearchParams()

    params.append('token', req.params.token)
    axios.post('http://localhost/oauth2/introspect', params, {
        auth: {
            username: client.id,
            password: client.client_secret
        }
    })
    .then(axres => res.render('introspect', {message: JSON.stringify(axres.data, null, '    ')}))
    .catch(err => next(err))
})

router.get('/init', (req, res, next) => {
    let queryData = {
        response_type: "code",
        client_id: client.id,
        redirect_uri: client.redirect_uris[0],
        scope: client.scope,
        //scope: 'openid data:read',
        state: uuid(),
        nonce: uuid()
    }
    let query = queryString.stringify(queryData)

    res.redirect(`http://localhost/oauth2/auth?${query}`)
})

module.exports = router