module.exports = function(app){
	app.get('/', function(req, resp){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.findAll(function (err, results) {

			resp.render('home/index', {livros: results});
		});
		connection.end();
	});
}	