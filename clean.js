const axios = require('axios')

const client = require('./conf/client')

axios.delete(`http://localhost/clients/${client.id}`)
.then(axres => console.log(axres.data))
.catch(err => console.error(err.response.data))