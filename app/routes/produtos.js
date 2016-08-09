module.exports = function (app) {
    var listaProdutos = function (req, resp) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var id = req.params.id
        produtosDAO.findAll(function (err, results) {
            resp.format({
                html: function () {
                    console.log(results)
                    resp.render('produtos/lista', {lista: results})
                },
                json: function () {
                    resp.json(results);
                }
            });
        });
        connection.end();
    }
    app.get('/produtos/form', function (req, resp) {
        var produtos = req.body;
        resp.render('produtos/form', {errs: {}, produtos: {}, finded: {}});
    });
    app.get('/produtos', function (req, resp) {
        listaProdutos(req, resp);
    });
    app.post('/produtos', function (req, resp) {
        var produtos = req.body;
        var id = req.params.id
        req.assert('nome', 'Obrigatório').notEmpty();
        req.assert('preco', 'Formato Inváido!').isFloat();
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var errs = req.validationErrors();
        if (errs) {

            resp.render('produtos/form', {errs: errs, produtos: produtos});
            return;
        }
        if(id != null){
            produtosDAO.save_update(id, produtos, function (err, results) {
                resp.redirect('/produtos')
            })
        }else
        produtosDAO.salva(produtos, function (err, results) {
                resp.redirect('/produtos');
            });
    });

    app.get('/produtos/:id', function (req, resp) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var produtos = req.body
        var id = req.params.id
        produtosDAO.findById(id, function (err, results) {
            resp.render('produtos/form', {
                errs: {},
                produtos: results
            });
        });
    });

    app.post('/produtos/:id', function (req, resp) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var produtos = req.body;
        var id = req.params.id
        produtosDAO.save_update(id, produtos, function (err, results) {
            resp.redirect('/produtos');
        })

    });

    app.get('/produtos/delete/:id', function (req, resp) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var id = req.params.id;

        produtosDAO.deletar(id, function (err, results) {
            resp.redirect('/produtos');
        })
    });
}
