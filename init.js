const axios = require('axios')

const client = require('./conf/client')

axios.post("http://localhost/clients", client)
.then(axres => console.log(JSON.stringify(axres.data, null, '    ')))
.catch(err => console.error(err.response.data))