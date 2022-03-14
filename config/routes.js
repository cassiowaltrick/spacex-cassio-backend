const express = require('express');
const routes = express.Router();

routes.get('/',async (req,res)=>{
    var config = {
        method: 'get',
        url: 'latest/',
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
});

module.exports=routes;