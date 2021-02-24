var conn = require('./db');

module.exports = {

    dashboard() {

        return new Promise((resolve, reject) => {

            conn.query(` 
            SELECT
                (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
                (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
                (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
                (SELECT COUNT(*) FROM tb_users) AS nrusers
        `,
                (err, results) => { // trata o erro e a solucao

                    if (err) { // caso de erro

                        reject(err); // mostra o erro

                    } else { // aqui ser de certo

                        resolve(results[0]); // traz a primeira posição dos array

                    }
                });
        });
    },

    getParams(req, params) { // certa parametros em cada rota

        return Object.assign({}, { // junta os objetos

            menus: req.menus,
            user: req.session.user

        }, params);
    },

    getMenus(req) { // coloca as informação de cada parte do menu

        let menus = [{
            text: "Tela inicial",
            href: "/admin/",
            icon: "home",
            active: false,
        }, {
            text: "Menu",
            href: "/admin/menus",
            icon: "cutlery",
            active: false,
        }, {
            text: "Reservas",
            href: "/admin/reservations",
            icon: "calendar-check-o",
            active: false,
        }, {
            text: "Contatos",
            href: "/admin/contacts",
            icon: "comments",
            active: false,
        }, {
            text: "Usuários",
            href: "/admin/users",
            icon: "users",
            active: false,
        }, {
            text: "E-mails",
            href: "/admin/emails",
            icon: "envelope",
            active: false,
        }, ];

        menus.map(menu => {

            if (menu.href === `/admin${req.url}`) // verifica ser em qual url esta no momento
                menu.active = true // ativa a classe que fala que esta naquela parte do menu
        })

        return menus;
    }
}