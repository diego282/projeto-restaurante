let conn = require('./db');
let path = require('path');

module.exports = {
    getMenus() {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "SELECT * FROM  tb_menus ORDER BY title", (err, results) => { // oega a tabela menu de acordo com o titulo
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    },

    save(fields, files) { // metodo para salvar o menu

        fields.photo = `images/${path.parse(fields.photo.path).base}`;

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                // faz a inserção na tabela passando os campos e seus valores
                `
                 INSERT INTO tb_menus (title, description, price, photo) 
                 VALUES(?, ?, ?, ?)                                      
                `, [
                    fields.title,
                    fields.description,
                    fields.price,
                    fields.photo

                ], (err, results) => { // trata um possovel erro ou solução

                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    } else {

                        resolve(results); // volta quando da certo
                    }

                });
        });
    }
};