function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype

        .findAll = function (callback) {
    this._connection.query('SELECT * FROM produtos', callback);
};

ProdutosDAO.prototype
        .salva = function(produtos,callback) {
    this._connection.query('INSERT INTO produtos SET ?', produtos, callback);

};
ProdutosDAO.prototype

        .deletar = function(id,callback) {
    this._connection.query('DELETE FROM produtos WHERE id=?',[id] , callback);

};
ProdutosDAO.prototype

    .save_update = function(id, produtos, callback) {
    this._connection.query('UPDATE produtos SET ? WHERE id=?',[produtos,id] , callback);

};

ProdutosDAO.prototype

        .findById = function(id,callback) {
    this._connection.query('SELECT * FROM produtos WHERE id=?', [id], callback);

};
module.exports = function () {
    return ProdutosDAO;
};
