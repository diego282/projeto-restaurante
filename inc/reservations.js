var conn = require('./db'); // chama a conexao com o banco de dados
module.exports = {

    render(req, res, error, success) { // pega o corpo da requisicao via post, o res, e uma possivel erro e uma possivel sucesso

        res.render('reservations', { // rendenizar a pagina reservas

            title: 'Reservas - Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
        });
    },

    getReservations() {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "SELECT * FROM  tb_reservations ORDER BY date DESC", (err, results) => { // oega a tabela reservas de acordo com o a data da reserva
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    },

    save(fields) { // salva o formulario no banco de dados

        return new Promise((resolve, reject) => {

            if (fields.date.indexOf('/') > -1) { // procura ser tem uma barra

                let date = fields.date.split('/'); // separa a data, aonde tem /
                fields.date = `${date[2]}-${date[1]}-${date[0]}` // aqui converte para o padrao mysql ano-mes-dia
            }

            let query, params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time

            ];

            if (parseInt(fields.id) > 0) {

                query = `
                        UPDATE tb_reservations
                        SET name = ?, email = ?, people = ?, date = ?, time = ?
                        WHERE id = ?
                    `;

                params.push(fields.id);
            } else {
                query = `
                        INSERT INTO tb_reservations (name, email, people, date, time)
                        VALUES(?, ?, ?, ?, ?)
                    `;
            }
            conn.query(query, params, (err, results) => {

                if (err) {

                    // ser tiver algum erro
                    reject(err) // chama a mensagem de erro

                } else { // quando da certo

                    resolve(results); // volta que deu certo
                }
            });
        });

    },

    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "DELETE FROM  tb_reservations WHERE id = ?", [

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