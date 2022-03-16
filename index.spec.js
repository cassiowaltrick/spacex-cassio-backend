const server = require('./server');
const supertest = require('supertest');

describe('Testando as rotas do meu servidor',()=>{
    it('rota último lançamento', ()=>{
        verifyArrayContainsObjectWithName('/ultimolancamento');
    });
    it('rota últimos lançamentos', ()=>{
        verifyArrayContainsObjectWithName('/ultimoslancamentos');
    });
    it('rota próximo lançamento', ()=>{
        verifyArrayContainsObjectWithName('/proximolancamento');
    });
    it('rota próximos lançamentos', ()=>{
        verifyArrayContainsObjectWithName('/proximoslancamentos');
    });
});

async function verifyArrayContainsObjectWithName(url){
    const res = await supertest(server).get(url);
    expect(res.statusCode).toEqual(200);
    
    if(res.body.length > 0){
        var firstElemento = res.body[0];
        expect(firstElemento).toHaveProperty('name');
    }
}