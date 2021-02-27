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

    save(fields, files) { // metodo para salva no banco de dados

        return new Promise((resolve, reject) => {

            fields.photo = `images/${path.parse(files.photo.path).base}`;

            let query, queryPhoto = '',
                params = [
                    fields.title,
                    fields.description,
                    fields.price
                ];

            if (files.photo.name) { // ser tive foto
                queryPhoto = ',photo = ?'; // adiciona na requecisão
                params.push(fields.photo); // adiciona no parametros
            }

            if (parseInt(fields.id) > 0) { // aqui ser o id for maior que 0 faz o update
                params.push(fields.id); // adiciona o parametro id
                query = ` 
                    UPDATE tb_menus
                    SET title = ?,
                        description = ?,
                        price = ?
                        ${queryPhoto}
                    WHERE id = ?
                `;
                // acima faz o update da tabela menu

            } else { // ser nao for update, insere mo menu

                if (!files.photo.name) { // aqui ser não tiver foto
                    reject('Envie a photo para o prato'); // exibe essa mensagem

                }
                query = `
                INSERT INTO tb_menus (title, description, price, photo)
                VALUES(?, ?, ?, ?)
                `;
                // acima faz o inserção na tabela menu
            }
            conn.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "DELETE FROM  tb_menus WHERE id = ?", [

                    id

                ], (err, results) => { // oega a tabela menu de acordo com o titulo
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    }
};