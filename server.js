const express = require('express');
var cors = require('cors');

const server = express();
server.use(cors());

server.use(express.json());

const api = require('./api');

function convertDataInStringPT_BR(data){
    var dataConvert = data==null?new Date():new Date(data);
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

function mapListaLancamentos(data,res){
    var lista = data.map(e=>{
        return {name:e.name,date_local:convertDataInStringPT_BR(e.date_local)};
    });
    return res.json(lista);
}

server.get('/ultimoLancamento',async (req,res)=>{
    try{
        const{data}= await api.get('latest');
        return res.json([{name:data.name,date_local:convertDataInStringPT_BR(data.date_local)}]);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/proximoLancamento',async (req,res)=>{
    try{
        const{data}= await api.get('next');
        return res.json([{name:data.name,date_local:convertDataInStringPT_BR(data.date_local)}]);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/ultimosLancamentos',async (req,res)=>{
    try{
        const{data}= await api.get('past');
        data.sort((a, b) => new Date(b.date_local) - new Date(a.date_local))
        return mapListaLancamentos(data,res);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/proximosLancamentos',async (req,res)=>{
    try{
        const{data}= await api.get('upcoming');
        return mapListaLancamentos(data,res);
    }catch(error){
        return res.json({error:error.message});
    }
});

module.exports=server;