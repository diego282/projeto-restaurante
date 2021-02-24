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

    save(fields) { // salva o formulario no banco de dados

        return new Promise((resolve, reject) => {

            let date = fields.date.split('/'); // separa a data, aonde tem /
            fields.date = `${date[2]}-${date[1]}-${date[0]}` // aqui converte para o padrao mysql ano-mes-dia

            conn.query( // faz a conexão com o banco de dados
                //INSERT INTO:  inserir os dados na tabela passada
                // VALUES: seta os valores desses camplos
                // [fields ...]: passa o campo de cada uma na tabela
                `INSERT INTO tb_reservations (name, email, people, date, time ) 
                        VALUES( ? , ? , ? , ? , ? )
                        `, [
                    fields.name,
                    fields.email,
                    fields.people,
                    fields.date,
                    fields.time
                ], (err, results) => {

                    if (err) {

                        // ser tiver algum erro
                        reject(err) // chama a mensagem de erro

                    } else { // quando da certo

                        resolve(results); // volta que deu certo
                    }
                });
        });

    }

};