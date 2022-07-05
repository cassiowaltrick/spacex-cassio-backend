
const express = require('express');
const cors = require('cors');
const api = require('./api'); 
const viacep = require('busca-cep');
const cpfs = require('./CPF.json');
const cnpjs = require('./CNPJ.json');

const server = express();
server.use(express.json());
server.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    server.use(cors());
    next();
});

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

server.get('/cpf/:cpf',async (req,res)=>{
    try{
        var cpf = req.params.cpf;
        var lista = cpfs.filter(e=>{ return e.CPF == cpf});
        if(lista.length>0){
            return res.json(lista[0]);
        }else{
            return res.json({});
        }
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/cnpj/:cnpj',async (req,res)=>{
    try{
        var cnpj = req.params.cnpj;
        var lista = cnpjs.filter(e=>{ return e.NI == cnpj});
        return res.json(lista);
    }catch(error){
        return res.json({error:error.message});
    }
});

server.get('/cep/:cep',async (req,res)=>{
    try{
        var cep = req.params.cep;
        var resposta = viacep(cep, {sync: true});
        if(!resposta.hasError){
            return res.json({
                cep: resposta.cep,
                TipoCep: "",
                SubTipoCep:"",
                UF: resposta.uf,
                Cidade: resposta.localidade,
                Bairro: resposta.bairro,
                Endereco: resposta.logradouro,
                Complemento: resposta.complemento,
                CodigoIBGE: resposta.ibge
            });
        }else{
            return res.json(resposta);
        }
    }catch(error){
        return res.json({error:error.message});
    }
});

module.exports=server;