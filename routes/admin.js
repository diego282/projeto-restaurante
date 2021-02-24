var express = require('express');
const admin = require('./../inc/admin');
var users = require('./../inc/users');
var menus = require('./../inc/menus');
var router = express.Router();
let path = require('path');

router.use(function(req, res, next) {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) { // ser o usuario não tiver logado

        res.redirect("/admin/login"); // redereciona para a pagina de login

    } else {

        next(); // vai na proxima rota
    }
});

router.use(function(req, res, next) { // passa a requisao de menus "dinamico" para todas as rotas

    req.menus = admin.getMenus(req); // chama o metodo que certa os dados de cada rota do menu
    next(); // vai na proxima rota
});

router.get('/logout', function(req, res, next) { // rota para sair da administração

    delete req.session.user; // deleta o usuario salvo quando sair

    res.redirect('/admin/login') // redireciona para a pagina de login

});

router.get("/", function(req, res, next) { // home da administração

    admin.dashboard().then(data => {

        res.render("admin/index", admin.getParams(req, { // redeniza a pagina

            data

        }))

    }).catch(err => { // ser de erro

        console.error(err); // mostra o erro
    })

});

router.post('/login', (req, res, next) => {

    if (!req.body.email) { // ser não passou o email

        users.render(req, res, "Preencha o campo e-mail.") // redenizar a pagina

    } else if (!req.body.password) { // ser não passou a senha

        users.render(req, res, "Preencha o campo senha.") // redenizar a pagina

    } else { // caso tiver ambos certos faz o login

        users.login(req.body.email, req.body.password).then(user => { // pega o email e senha e faz o login

            req.session.user = user; // salva o usuario que entrou na sessao

            res.redirect("/admin"); // redireciona para a home da administração

        }).catch(err => { // caso de algum erro

            users.render(req, res, err.message || err) // redenizar a pagina, e mostra a mensagem de erro

        });
    }

});

router.get("/login", function(req, res, next) { // pagina de login para a administração

    users.render(req, res, null) // redenizar a pagina
});

router.get("/contacts", function(req, res, next) { // rota de contatos na administração

    res.render("admin/contacts", admin.getParams(req)) // redeniza a pagina
});

router.get("/emails", function(req, res, next) { // rota de emails na administração

    res.render("admin/emails", admin.getParams(req)) // redeniza a pagina
});

router.get("/menus", function(req, res, next) { // rota do menu do restaurante da administração

    menus.getMenus().then(data => {

        res.render("admin/menus", admin.getParams(req, { // redeniza a pagina

            data
        }))
    });

});

router.post("/menus", function(req, res, next) { // rota do menu do restaurante da administração

    menus.save(req.fields, req.files).then(results => { // salva o novo item adicionado no menu

        res.send(results); // envia para telas os dados(redenizar)

    }).catch(err => { // ser de erro

        res.send(err); // envia para telas os dados(redenizar), no caso aqui o erro

    })

});

router.get("/reservations", function(req, res, next) { // rota de reservas da administração

    res.render("admin/reservations", admin.getParams(req, { // redeniza a pagina

        date: {}

    }));
});

router.get("/users", function(req, res, next) { // rota users da administração

    res.render("admin/users", admin.getParams(req)) // redeniza a pagina
});


module.exports = router;