var conn = require('./db'); // chama a conexao com o banco de dados
module.exports = {

    render(req, res, error, success) { // pega o corpo da requisicao via post, o res, e uma possivel erro e uma possivel sucesso

        res.render('contacts', { // rendenizar a pagina contato

            title: 'Contato - Restaurante Saboroso!',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga um oi!',
            body: req.body,
            error,
            success
        });
    },

    save(fields) { // salva o formulario no banco de dados

        return new Promise((resolve, reject) => {

            conn.query( // faz a conexão com o banco de dados
                //INSERT INTO:  inserir os dados na tabela passada
                // VALUES: seta os valores desses camplos
                // [fields ...]: passa o campo de cada uma na tabela
                `INSERT INTO tb_contacts (name, email, message) 
                        VALUES(? , ? , ?)
                        `, [
                    fields.name,
                    fields.email,
                    fields.message
                ], (err, results) => {

                    if (err) {

                        // ser tiver algum erro
                        reject(err) // chama a mensagem de erro

                    } else { // quando da certo

                        resolve(results); // volta que deu certo
                    }
                });
        });

    },

    getContacts() {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "SELECT * FROM  tb_contacts ORDER BY register DESC", (err, results) => { // oega a tabela reservas de acordo com o a data da reserva
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
                "DELETE FROM  tb_contacts WHERE id = ?", [

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