const util = require('util')
const express = require('express')
const body_parser = require('body-parser')

const app = express()

require('url-search-params-polyfill')

app.use(body_parser.urlencoded({}))
app.use(body_parser.json({}))

app.set('view engine', 'pug')
app.set('views', './views')

app.get("/info", (req, res) => {
    res.render("info", {})
})

const login = require('./router/login')
app.use('/login', login)

const consent = require('./router/consent')

app.use('/consent', consent)

const oauth = require('./router/oauth')
app.use('/oauth', oauth)

app.use((err, req, res, next) => {
    debugger
    console.error(err.stack)
    let resp = err.response ? {
        status: err.response.status,
        headers: err.response.headers,
        body: err.response.data
    } : {}
    res.render('error', {
        stack: err.stack,
        message: JSON.stringify(resp, null, '    ')
    })
})

app.listen(3000)