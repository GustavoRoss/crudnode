module.exports = function (app) {
    app.get('/produtos/form', function (req, resp, next) {
        var produtos = req.body;
        resp.render('produtos/form', {errs: {}, produtos: {}, finded: {}});
    });
    app.get('/produtos', function (req, resp, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.findAll(function (err, results) {
            if (err) {
                return next(err)
            }
            resp.format({
                html: function () {
                    resp.render('produtos/lista', {lista: results})
                },
                json: function () {
                    resp.json(results);
                }
            });
        });
        connection.end();

    });
    app.post('/produtos', function (req, resp, next) {
        var produtos = req.body;
        req.assert('nome', 'Obrigatório').notEmpty();
        req.assert('preco', 'Formato Inváido!').isFloat();
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var errs = req.validationErrors();
        if (errs) {
            resp.format({
                html: function () {
                    resp.status(400).render("produtos/form", {errs: errs, produtos: produtos});
                },
                json: function () {
                    resp.status(400).send(errors);
                }
            });
            return;
        }
        produtosDAO.salva(produtos, function (err) {
            if(err){
                return next(err);
            }
            resp.redirect('/produtos');
        });
    });

    app.get('/produtos/:id', function (req, resp, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var produtos = req.body
        var id = req.params.id
        produtosDAO.findById(id, function (err, results) {

            if(err){
                return next(err);
            }
              console.log(results);
            resp.render('produtos/form', {
                errs: {},
                produtos: results
            });
        });
    });

    app.post('/produtos/:id', function (req, resp, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var produtos = req.body;
        var id = req.params.id
        produtosDAO.save_update(id, produtos, function (err) {
            if(err){
                return next(err);
            }
            resp.redirect('/produtos');
        })

    });

    app.get('/produtos/delete/:id', function (req, resp, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var id = req.params.id;

        produtosDAO.deletar(id, function (err) {
            if(err){
                return next(err);
            }
            resp.redirect('/produtos');
        })
    });
}
