var conn = require('./db'); // chama a conexao com o banco de dados
module.exports = {

    getEmails() {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "SELECT * FROM  tb_emails ORDER BY email", (err, results) => { // oega a tabela reservas de acordo com o a data da reserva
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    },

    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "DELETE FROM  tb_emails WHERE id = ?", [

                    id

                ], (err, results) => { // oega a tabela menu de acordo com o titulo
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    },

    save(req) {

        return new Promise((resolve, reject) => {
            if (!req.fields.email) { // ser não existir

                reject("Preencha o e-mail.");

            } else { // ser tive tudo certo, inserer no banco de dados, na tabela email
                conn.query(`
                INSERT INTO tb_emails (email) VALUES(?)
                `, [

                    req.fields.email
                ], (err, results) => { // aqui ser de erro ou certo

                    if (err) {

                        reject(err.message);
                    } else {

                        resolve(results);
                    }
                });
            }

        })
    }
}