const { resolveInclude } = require('ejs');
var conn = require('./db'); // chama a conexão com o banco de dados

module.exports = {

    render(req, res, error) { // rendeniza na tela

        res.render("admin/login", {

            body: req.body, // para deixar algum campo com o dados preenchido caso de erro
            error // mostra mensagem de erro caso aconteca algum
        });

    },

    login(email, password) { // faz o login

        return new Promise((resolve, reject) => {

            conn.query( // faz a conexão
                ` SELECT * FROM tb_users WHERE email =?  `, // seleciona a tabela de usuario, pegando o email
                [
                    email // passa o campo email

                ], (err, results) => { // aqui analiza um possivel erro e solução

                    if (err) { // aqui ser de errado

                        reject(err); // mostra mensagem de erro

                    } else {

                        if (!results.length > 0) { // ver ser o array results tem pelo menos 1 dados dentro dele

                            reject('Usuário ou senha incorretos.') // mostra a mensagem ser nao achar o email e sennha
                        } else {

                            let rows = results[0]; // pega o primeira posição do array

                            if (rows.password !== password) { // verifica ser a senha e diferent que a passada

                                reject('Usuário ou senha incorretos.') // mostra a mensagem ser nao achar o email e senha

                            } else { // aqui ser ocorre tudo certo

                                resolve(rows) // retorna as linhas afetadas
                            }
                        }
                    }
                }
            )
        })
    }
}