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
    },

    getUsers() {

        return new Promise((resolve, reject) => {

            conn.query( // faz a pesquisa dos usuarios no banco de dados
                "SELECT * FROM  tb_users ORDER BY name", (err, results) => { // oega a tabela menu de acordo com o titulo
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    },

    save(fields, files) { // metodo para salva no banco de dados

        return new Promise((resolve, reject) => {


            let query, queryPhoto = '',
                params = [
                    fields.name,
                    fields.email

                ];

            if (parseInt(fields.id) > 0) { // aqui ser o id for maior que 0 faz o update
                params.push(fields.id); // adiciona o parametro id
                query = ` 
                    UPDATE tb_users
                    SET name = ?,
                        email = ? 
                    WHERE id = ?
                `;
                // acima faz o update da tabela menu

            } else { // ser nao for update, insere mo menu

                query = `
                INSERT INTO tb_users (name, email, password)
                VALUES(?, ?, ?)
                `;

                params.push(fields.password); // passa a senha
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
                "DELETE FROM  tb_users WHERE id = ?", [

                    id

                ], (err, results) => { // oega a tabela menu de acordo com o titulo
                    if (err) { // caso de errado
                        reject(err); // mostra erro
                    }

                    resolve(results); // volta quando da certo
                });
        });
    },

    changePassword(req) { // faz a validação da troca de senhas

        return new Promise((s, f) => {


            if (!req.fields.password) { // ser não tive a senha

                f('Preencha a senha.'); // mostra mensagem para preencher

            } else if (req.fields.password !== req.fields.passwordConfirm) { // ser a senha digitada for diferente do campo senha2

                f('Confirme a senha corretamente.'); // pede para confirma a senha

            } else { // caso tiver tudo certo
                // faz a conexao com banco de dados, faz update na tabela de usuarios no campo de senha passado o id para encontrar a linha
                conn.query(`
                        UPDATE tb_users SET password = ? WHERE id = ?
                    `, [
                    req.fields.password,
                    req.fields.id

                ], (err, results) => { // possivel erro ou solução

                    if (err) { // aqui quando da errado

                        f(err.message); // mostra a mensagem de erro

                    } else { // aqui quando da certo

                        s(results); // mostra que deu certo
                    }

                });

            }
        })
    }
}