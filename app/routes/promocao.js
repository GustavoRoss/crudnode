module.exports = function(app){
	app.get('/promocao', function(req, resp){
		var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.findAll(function (err, results) {
            if (err) {
                return next(err)
            }
            resp.render('promocao/form', {lista:results})
        });
        connection.end();
	});
	 app.post("/promocao", function(req,res) {
        var promocao = req.body;

        app.get('io').emit("novaPromocao",promocao);
        res.redirect("/promocao");
    });

}