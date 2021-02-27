// HTMLFormElement.prototype.save = function() { // usando prototupe para mexer mo comportamento padrao

//     let form = this;

//     return new Promise((s, f) => {

//         let btnSubmit = form.querySelector('[type=submit]'); // seleciona a tag a ser afetada
//         let btnSubmitText = btnSubmit.innerHTML; // exibe na tela a informação obtida

//         let formData = new FormData(form); // pega os dados do formulario

//         let xhr = new XMLHttpRequest();

//         xhr.open(form.method, form.action, true); // abre o arquivo passao o metodo e a ação

//         xhr.onloadend = event => { // quando tiver carregando

//             btnSubmit.innerHTML = btnSubmitText;
//             btnSubmit.disabled = false; // ativa o botao de enviar

//             let response;

//             try { // trata erro de dados sensiveis
//                 response = JSON.parse(xhr.responseText);
//             } catch (err) { // ser de erro
//                 response = xhr.responseText;
//             }

//             if (xhr.status === 200) { // ser de certo
//                 s(response); // mostra a resposta de sucesso
//             } else { // ser não
//                 f(response); // mostra a mensagem de erro
//             }

//         }

//         xhr.onerror = () => { // ser o carregamento(envio) de erro

//             f(xhr); // mostra o erro

//         }

//         btnSubmit.innerHTML = 'Enviando...'; // mostra que esta enviando
//         btnSubmit.disabled = true; // desativa o botao de enviar

//         xhr.send(formData);

//     });

// }

// HTMLFormElement.prototype.submitAjax = function(config) {

//     let form = this;

//     form.addEventListener('submit', e => {

//         e.preventDefault();

//         form.save().then((response) => {

//             if (typeof config.success) config.success(response);

//         }).catch(err => {

//             if (typeof config.failure) config.failure(err.error || err);

//         });

//     });

// }
HTMLFormElement.prototype.save = function(config) {

    let form = this;

    form.addEventListener('submit', e => {

        // Cancelar o envio padrão do formulário para não enviar o post ainda
        e.preventDefault();

        // Criando um objeto com os dados
        let formData = new FormData(form);

        // Passando os dados para o nosso servidor via AJAX
        // Fetch(buscar): fetch("route").then => O método "fetch"
        fetch(form.action, {

                // Alterar o método para POST
                method: form.method,
                // Passando os dados do formuláio
                body: formData

            })
            // Esse "response" são os dados de envio do servidor
            // e não do conteúdo da mensagem. Por isso o "response.JSON()"
            .then(response => response.json())
            // Assim temos uma nova promessa.
            // Agora o "json" tem o conteúdo dos dados
            .then(json => {

                if (json.error) { // ser json.error existir

                    if (typeof config.failure === 'function')
                        config.failure(json.error);

                } else {
                    // Atualizar a tela após clicar no botão "salvar"
                    if (typeof config.success === 'function')
                        config.success(json);
                }

            }).catch(err => {

                if (typeof config.failure === 'function')
                    config.failure(err);

            });

    });

}