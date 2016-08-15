var express = require('../config/express')()
var request = require('supertest')(express)

beforeEach(function(done) {
    var connection = express.infra.connectionFactory();            
    connection.query("delete from produtos", function(ex,result){
        if(!ex){
            done();
        }
    });
});
describe('#ProdutosController', function () {

    it('#Listagem JSON', function (done) {
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
    it('#Cadastro de produtos inválidos', function (done) {
        request.post('/produtos')
        .send({nome: "", preco: "", descricao: "TESTEEEE"})
        .expect(400, done);
    });
    it('#Cadastro de produtos com dados válidos', function (done) {
        request.post('/produtos')
        .send({nome: "NODE NA VEIA", preco: "100", descricao: "FODA BAGARAI"})
        .expect(302, done)
    });
});

