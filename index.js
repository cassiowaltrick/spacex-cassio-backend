const api=require('./api');
const express = require('express');
var cors = require('cors')

const server = express();
server.use(cors())

server.use(express.json());

function convertDataInStringPT_BR(data){
    var dataConvert = data==null?new Date():new Date(data);
    debugger;
    var ano = dataConvert.getFullYear();
    var mes = dataConvert.getMonth()+1;
    var dia = dataConvert.getDate();
    var hora = dataConvert.getHours();
    var minutos = dataConvert.getMinutes();
    var segundos = dataConvert.getSeconds();

    return (dia<10?'0':'')+dia+'/'+
    (mes<10?'0':'')+mes+'/'+
    ano+' '+
    (hora<10?'0':'')+hora+':'+
    (minutos<10?'0':'')+minutos+':'+
    (segundos<10?'0':'')+segundos;
}

server.listen(8000,()=>{   
    console.log(convertDataInStringPT_BR()
    +' Express started at http://localhost:8000')
});

server.get('/ultimoLancamento',async (req,res)=>{
    try{
        const{data}= await api.get('latest');
        var object =[];
        object.push({name:data.name,date_local:convertDataInStringPT_BR(data.date_local)});
        return res.json(object);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/proximoLancamento',async (req,res)=>{
    try{
        const{data}= await api.get('next');
        var object =[];
        object.push({name:data.name,date_local:convertDataInStringPT_BR(data.date_local)});
        return res.json(object);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/ultimosLancamentos',async (req,res)=>{
    try{
        const{data}= await api.get('past');        
        data.sort((a, b) => new Date(b.date_local) - new Date(a.date_local));
        var lista = data.map(e=>{
                return {name:e.name,date_local:convertDataInStringPT_BR(e.date_local)};
            });
        return res.json(lista);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/proximosLancamentos',async (req,res)=>{
    try{
        const{data}= await api.get('upcoming');
        var lista = data.map(e=>{
                return {name:e.name,date_local:convertDataInStringPT_BR(e.date_local)};
            });
        return res.json(lista);
    }catch(error){
        return res.json({error:error.message});
    }
});