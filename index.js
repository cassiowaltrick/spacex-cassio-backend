const server = require('./server');

server.listen(process.env.PORT || 8000,()=>{   
    'Express started at http://localhost:8000'
});