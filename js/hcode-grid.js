class HcodeGrid {

    constructor(configs) {

        configs.listeners = Object.assign({

            afterUpdateClick: (e) => { // depois do click

                $('#modal-update').modal('show'); // abre o modal
            },
            afterDeleteClick: (e) => { // depois do click

                window.location.reload(); // da resfash na pagina automaticamente

            },
            afterFormCreate: (e) => { // depois do click

                window.location.reload(); // da resfash na pagina automaticamente

            },
            afterFormUpdate: (e) => { // depois do click

                window.location.reload(); // da resfash na pagina automaticamente

            },
            afterFormUpdateError: (e) => { // depois do click

                alert("Não foi possivel editar o formulário")

            },
            afterFormCreateError: (e) => { // depois do click

                alert("Não foi possivel enviar o formulário")

            }
        }, configs.listeners);

        this.options = Object.assign({}, {

            formCreate: "#modal-create form",
            formUpdate: "#modal-update form",
            btnUpdate: "btn-update",
            btnDelete: "btn-delete",
            onUpdateLoad: (form, name, data) => {

                let input = form.querySelector('[name=' + name + ']');
                if (input) input.value = data[name];
            }
        }, configs);

        this.rows = [...document.querySelectorAll('table tbody tr')]; // pega a tabela a coluina e linha e transforma em um array
        this.initButtons(); // inicia os botão
        this.initForms(); // inicia os formularios

    }

    initForms() { // iniciar os formularios

        // aqui e o formulario de criar outro menu
        this.formCreate = document.querySelector(this.options.formCreate) // pega o modal de criar 

        this.formCreate.save({

            success: () => {

                this.fireEvents('afterFormCreate'); // faz o reload(resfash) dps que envia o formulario

            },
            failure: err => {


                this.fireEvents('afterFormCreateError'); // mostra mensagem de erro
            }


        });



        // aqui e o formulario de editar o menu
        this.formUpdate = document.querySelector(this.options.formUpdate); // seleciona o modal de editar

        this.formUpdate.save({


            success: () => {

                this.fireEvents('afterFormUpdate'); // faz o reload(resfash) dps que update do formulario

            },
            failure: err => {


                this.fireEvents('afterFormUpdateError'); // mostra mensagem de erro
            }
        });

    }

    fireEvents(name, args) {

        if (typeof this.options.listeners[name] === 'function')
            this.options.listeners[name].apply(this, args);
    }

    getTrData(e) { // pega a data do objetos(os dados)

        let tr = e.composedPath().find(el => { // percorre o menu

            return (el.tagName.toUpperCase() === 'TR'); // e retorna quando o nome de cada item do menu, for igual a linha do tr

        });

        return JSON.parse(tr.dataset.row); // passa os dados para objetos, para ser manipulado
    }

    btnUpdateClick(e) { // faz o update(editar) ao clicar no botão

        this.fireEvents('beforeUpdateClick', [e]); // antes do click

        let data = this.getTrData(e); // chama o metodo que pega os dados do prato(linha) clicada

        for (let name in data) { // para cada um dos nomes que encontrar

            this.options.onUpdateLoad(this.formUpdate, name, data); // carrega o formulario de update
        }

        this.fireEvents('afterUpdateClick', [e]); // depois do click

    }

    btnDeleteClick(e) { // faz o delete(apagar) ao clicar no botão

        let data = this.getTrData(e); // chama o metodo que pega os dados do prato(linha) clicada

        if (confirm(eval('`' + this.options.deleteMsg + '`'))) { // exibe a mensagem ser quer excluir


            fetch(eval('`' + this.options.deleteURL + '`'), {

                method: "DELETE"

            }).then(response => response.json()).then(json => {

                this.fireEvents('afterDeleteClick'); // faz o delete
            });

        }

    }

    initButtons() { // inicia os botões

        this.rows.forEach(row => {

            [...row.querySelectorAll(".btn")].forEach(btn => { // transforma em um array, pegando todos os botao de editar e percorre ele

                btn.addEventListener('click', e => { // adiciona o evento ao clicar    

                    if (e.target.classList.contains(this.options.btnUpdate)) { // ver qual foi o evento clicado, e verifica ser e o update

                        this.btnUpdateClick(e); // faz a ação do botao update(editar)

                    } else if (e.target.classList.contains(this.options.btnDelete)) {

                        this.btnDeleteClick(e); // faz a ação do botao delete(apagar)

                    } else { // outro tipo do evento

                        this.fireEvents('buttonClick', [e.target, this.getTrData(e), e]); // o nome do botao, o botao em si, as informações da linha e o evento
                    }
                });
            });
        });

    }
}