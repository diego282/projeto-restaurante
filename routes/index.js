var conn = require('./../inc/db'); // conecta com o banco de dados
var menus = require('./../inc/menus'); // faz a chamada da 'class'(pasta)
var reservations = require('./../inc/reservations'); // faz a chamada da 'class'(pasta)
var contacts = require('./../inc/contacts'); // faz a chamada da 'class'(pasta)
var express = require('express');
var router = express.Router();
let path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) { // faz a rota da home

    menus.getMenus().then(results => { // chama o metodo que busca a rota do menus


        res.render('index', { title: 'Restaurante Saboroso!', menus: results, headerIndex: true });

    });
});

router.get('/menus', function(req, res, next) { // pega a rotas do menu

    menus.getMenus().then(results => { // chama o metodo que busca a rota do menus

        res.render('menus', {

            title: 'Menus - Restaurante Saboroso!',
            background: 'images/img_bg_1.jpg',
            h1: 'Saboreie nosso menu!!',
            menus: results
        }); // rendenizar a pagina menu

    });

});

router.get('/services', function(req, res, next) { // pega a rotas dos servicos

    res.render('services', {

        title: 'Serviços - Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        h1: 'É um prazer poder servir!!'
    }); // rendenizar a pagina servicos
});

router.get('/reservations', function(req, res, next) { // pega a rotas da reserva

    reservations.render(req, res); // rendenizar a pagina reservas

});

router.post('/reservations', function(req, res, next) { // pega a rotas da reserva pelo metodo post

    if (!req.body.name) { // ver ser o nome não existe no formulario

        reservations.render(req, res, "Digite o nome!"); // rendenizar a pagina reservas e ser não tiver no formulario aparece a mensagem

    } else if (!req.body.email) { // ver ser o email não existe no formulario

        reservations.render(req, res, "Digite o email!"); // rendenizar a pagina reservas e ser não tiver no formulario aparece a mensagem

    } else if (!req.body.people) { // ver ser o numero de pessoas esta setadas no formulario

        reservations.render(req, res, "Selecione o número de pessoas!"); // rendenizar a pagina reservas e ser não tiver no formulario aparece a mensagem

    } else if (!req.body.date) { // ver ser a data não existe no formulario

        reservations.render(req, res, "Informe a data da reserva!"); // rendenizar a pagina reservas e ser não tiver no formulario aparece a mensagem

    } else if (!req.body.time) { // ver ser a hora não existe no formulario

        reservations.render(req, res, "Informe a hora da reserva!"); // rendenizar a pagina reservas e ser não tiver no formulario aparece a mensagem

    } else { // ser tudo tiver sido colocado no bamco de dados a reserva e feita

        reservations.save(req.body).then(results => { // envia os dados, pegando o corpo da requisição e o salva no banco de dados

            req.body = {} // dps que salvou no banco de dados, limpa o formulario
            reservations.render(req, res, null, "Reserva realizada com sucesso!"); // rendenizar a pagina reservas e avisa que foi um sucesso

        }).catch(err => { // ser tiver algum erro

            reservations.render(req, res, err.message); // rendenizar a pagina reservas e ser não tiver no formulario aparece a mensagem de erro
        });
    }
});

router.get('/contacts', function(req, res, next) { // pega a rotas dos contantos

    contacts.render(req, res); // rendenizar a pagina  contacts
});

router.post('/contacts', function(req, res, next) { // pega a rotas da reserva pelo metodo post

    if (!req.body.name) { // ver ser o nome não existe no formulario

        contacts.render(req, res, "Digite o nome!"); // rendenizar a pagina  contacts e ser não tiver no formulario aparece a mensagem

    } else if (!req.body.email) { // ver ser o email não existe no formulario

        contacts.render(req, res, "Digite o email!"); // rendenizar a pagina  contacts e ser não tiver no formulario aparece a mensagem

    } else if (!req.body.message) { // ver ser a messagem esta setadas no formulario

        contacts.render(req, res, "Escreva a mensagem!"); // rendenizar a pagina contacts e ser não tiver no formulario aparece a mensagem

    } else { // ser tudo tiver sido colocado no bamco de dados a reserva e feita

        contacts.save(req.body).then(results => { // envia os dados, pegando o corpo da requisição e o salva no banco de dados

            req.body = {} // dps que salvou no banco de dados, limpa o formulario de contato
            contacts.render(req, res, null, "Mensagem enviada com sucesso!"); // rendenizar a pagina  contacts e avisa que foi um sucesso

        }).catch(err => { // ser tiver algum erro

            contacts.render(req, res, err.message); // rendenizar a pagina  contacts e ser não tiver no formulario aparece a mensagem de erro
        });
    }

});


module.exports = router;