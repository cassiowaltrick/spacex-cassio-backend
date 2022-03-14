var axios = require('axios');

const api = axios.create({
    baseURL:'https://api.spacexdata.com/latest/launches/'
});

module.exports=api;