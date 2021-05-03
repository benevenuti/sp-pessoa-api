let auth = ''

const BASE_URL = 'http://localhost:8080/api/v1/pessoa'

let registerEventListenerForForm = function () {
    // receita de bolo do boostrap, nao vou discutir com o padre
    // https://getbootstrap.com/docs/4.0/examples/checkout/
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation')

        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                    informAlert('#modal-alert-msg', 'Não foi possível submeter: verifique os campos e tente novamente')
                } else {
                    event.preventDefault()
                    event.stopPropagation()
                    salvarPessoa()
                }
                form.classList.add('was-validated')
            }, false);
        })
    }, false);

}

let registerConfirmaExclusaoModal = function () {
    $('#modalConfirmacao').on('show.bs.modal', function (e) {
        let button = $(e.relatedTarget)
        let pessoa_id = button.data("pessoa-id")
        let pessoa_url = button.data("pessoa-url")
        let pessoa_nome = button.data("pessoa-nome")

        console.info('botao clicado para o modal', button, 'pessoa-id', pessoa_id, 'pessoa-url', pessoa_url, 'pessoa-nome', pessoa_nome)

        let btnExcluir = $('#btn-modal-excluir')

        $('#modal-pessoa-nome').html(pessoa_nome)

        btnExcluir.attr('data-pessoa-url', pessoa_url)
        btnExcluir.attr('data-pessoa-id', pessoa_id)

        console.info('injetado no button excluir do modal', btnExcluir)

    })
}

let registraCadastroModal = function () {
    $('#modalCadastroPessoa').on('show.bs.modal', function (e) {

        $('.needs-validation').removeClass('was-validated')
        $('#modal-alert-msg').html('')

        let button = $(e.relatedTarget)
        let pessoa_id = button.data("pessoa-id")
        let pessoa_url = button.data("pessoa-url")

        console.info(pessoa_id, pessoa_url)

        console.info('button open modal cad', button)

        let btnCadSalvar = $('#btn-cad-salvar')
        if (pessoa_id) {
            btnCadSalvar.attr('data-pessoa-id', pessoa_id)
            btnCadSalvar.attr('data-pessoa-url', pessoa_url)
        } else {
            btnCadSalvar.removeAttr('data-pessoa-id')
            btnCadSalvar.removeAttr('data-pessoa-url')
        }

        console.info('button salvar cadastro', btnCadSalvar)

        abrirModalPessoa(pessoa_url)
    })
}

let registerButtonsActions = function () {
    $('#btn-atualizar').off().click(() => {
        let agora = new Date()
        console.info(`clicou em atualizar ${agora}`)
        // executa o refresh
        consultaPessoaList()
    })

    $('#btn-abrir-modal').off().click(() => {
        let agora = new Date()
        console.info(`clicou em abrir modal ${agora}`)
        // executa o refresh
        prepareThenShowModal(null)
    })

}

let consultaPessoaList = function () {

    $.ajax({
        headers: {
            "Authorization": auth
        },
        method: 'GET',
        url: `${BASE_URL}?size=10` // limitei em 10 fixo por página
    })
        .then(data => {
            //console.info(data)

            let pessoaList = data['_embedded']['pessoa']

            let tbody_pessoa = $('#tbody-pessoa')

            tbody_pessoa.html('')

            let trs = ''

            pessoaList.forEach(pessoa => {
                //console.info(pessoa)

                let link = pessoa['_links']['self']['href']

                trs += `<tr>`
                trs += `<td>${pessoa['nome']}</td>`
                trs += `<td>${pessoa['sexo']}</td>`
                trs += `<td>${pessoa['email']}</td>`
                trs += `<td>${pessoa['dataNascimento']}</td>`
                trs += `<td>${pessoa['naturalidade']}</td>`
                trs += `<td>${pessoa['nacionalidade']}</td>`
                trs += `<td>${pessoa['cpf']}</td>`
                trs += `<td>
                            <div class="btn-group" role="group" aria-label="Ações para ${pessoa['nome']}">
                                <button id="btn-editar-${pessoa['_id']}" data-pessoa-url="${link}" 
                                        type="button" 
                                        data-pessoa-id="${pessoa['_id']}" 
                                        class="btn btn-sm btn-warning"
                                        data-toggle="modal"
                                        data-target="#modalCadastroPessoa">Editar</button>
                                <button id="btn-excluir-${pessoa['_id']}" type="button"
                                        data-pessoa-id="${pessoa['_id']}" 
                                        data-pessoa-url="${link}"
                                        data-pessoa-nome="${pessoa['nome']}"
                                        class="btn btn-sm btn-danger"  
                                        data-toggle="modal"                                         
                                        data-target="#modalConfirmacao">Excluir</button>
                            </div>
                       </td>`
                trs += '</tr>'

            })
            tbody_pessoa.html(trs)

            //console.info(pessoaList)
        })
        .catch(error => {
            console.error(error)
            informAlert('#alert-msg', error['responseText'])
        })
}

let abrirModalPessoa = function (_url) {
    if (_url) {
        $.ajax({
            headers: {
                "Authorization": auth
            },
            method: 'GET',
            url: _url
        }).then(data => {
            console.info(`GET OK:`, data)
            prepareThenShowModal(data)
        }).catch(error => {
            console.error(`GET ERRO:`, error)
            informAlert('#alert-msg', error['responseText'])
        })
    } else {
        prepareThenShowModal(null)
    }

}

let injetaDadosForm = function (pessoa) {

    $('#pessoaId').val(pessoa['_id'])
    $('#nome').val(pessoa['nome'])
    $('#sexo').val(pessoa['sexo'])
    $('#email').val(pessoa['email'])
    $('#dataNascimento').val(pessoa['dataNascimento'])
    $('#naturalidade').val(pessoa['naturalidade'])
    $('#nacionalidade').val(pessoa['nacionalidade'])
    $('#cpf').val(pessoa['cpf'])

}

let limparDadosForm = function () {

    $('#pessoaId').val('')
    $('#nome').val('')
    $('#sexo').val('')
    $('#email').val('')
    $('#dataNascimento').val('')
    $('#naturalidade').val('')
    $('#nacionalidade').val('')
    $('#cpf').val('')

}

let capturaDadosForm = function () {
    let pessoa = {
        nome: $('#nome').val(),
        sexo: $('#sexo').val(),
        email: $('#email').val(),
        dataNascimento: $('#dataNascimento').val(),
        naturalidade: $('#naturalidade').val(),
        nacionalidade: $('#nacionalidade').val(),
        cpf: $('#cpf').val(),
    }

    console.info('pessoa capturada', pessoa)

    return pessoa
}

let salvarPessoa = function () {
    let pessoa = capturaDadosForm()

    let pessoaId = $('#pessoaId').val()

    let action = pessoaId ? 'PATCH' : 'POST'

    let url = pessoaId ? $('#btn-cad-salvar').data('pessoa-url') : BASE_URL

    console.info('url', url)

    $.ajax({
        headers: {
            "Authorization": auth
        },
        method: action,
        data: JSON.stringify(pessoa),
        url: url,
        dataType: 'json',
        contentType: 'application/json',
    }).then(data => {
        console.info(`${action} OK:`, data)
        consultaPessoaList()
        $("#modalCadastroPessoa").modal('hide')
    }).catch(error => {
        console.error(`${action} ERRO:`, error)
        informAlert('#modal-alert-msg', error['responseText'])
    })

}

let prepareThenShowModal = function (dados) {
    if (dados) {
        injetaDadosForm(dados)
    } else {
        limparDadosForm()
    }
}

let excluirPessoa = function (element) {

    let btn = $(element)

    console.info('button capturado:', btn)

    let _url = btn.data('pessoa-url')

    $.ajax({
        headers: {
            "Authorization": auth
        },
        method: 'DELETE',
        url: _url
    }).then(data => {
        console.info(`DELETE OK:`, data)
        consultaPessoaList()
        $("#modalConfirmacao").modal('hide')
    }).catch(error => {
        console.error(`DELETE ERRO:`, error)
        informAlert('#alert-msg', error['responseText'])
    })
}

let consultaPaises = function () {
    let _url = 'https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome'
    $.ajax({
        method: 'GET',
        url: _url
    }).then(data => {
        //console.info(`GET OK:`, data)
        montaListaPaises(data)
    }).catch(error => {
        console.error(`GET ERRO:`, error)
        informAlert('#alert-msg', error['responseText'])
    })
}

let montaListaPaises = function (paises) {
    let paisesList = paises.map(pais => {
        return pais['nome']
    })

    let options = "<option value=''>Selecione...</option>"

    paisesList.forEach(pais => {
        options += `<option value="${pais}">${pais}</option>>`
    })

    $('#nacionalidade').html(options)
}

let consultaMunicipios = function () {
    let _url = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome'
    $.ajax({
        method: 'GET',
        url: _url
    }).then(data => {
        //console.info(`GET OK:`, data)
        montaListaMunicipios(data)
    }).catch(error => {
        console.error(`GET ERRO:`, error)
        informAlert('#alert-msg', error['responseText'])
    })
}

let montaListaMunicipios = function (municipios) {
    let munList = municipios.map(mun => {
        return mun['nome'] + ' - ' + mun['microrregiao']['mesorregiao']['UF']['sigla'] // óóóó
    })

    let options = "<option value=''>Selecione...</option>"
    options += "<option value='Outra'>Outra</option>"

    munList.forEach(mun => {
        options += `<option value="${mun}">${mun}</option>>`
    })

    $('#naturalidade').html(options)
}

let informAlert = function (holder, text) {

    $(holder).html(
        '<div id="modal-error-alert" class="alert alert-danger alert-dismissible fade show" role="alert">\n' +
        '  <h4 class="alert-heading">Erro</h4>\n' +
        `  <span id="modal-error-alert-text">${text}</span>\n` +
        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '    <span aria-hidden="true">&times;</span>\n' +
        '  </button>\n' +
        '</div>'
    )
}

$(document).ready(
    function () {

        // kiss: aqui eu deixei solto no código, mas no mundo real você solicita antes as credenciais
        // e controla de outra forma... lembrando que o browser pede a senha para basic, haha!
        let username = 'amigo'
        let password = 'amigo'

        auth = "Basic " + btoa(username + ":" + password)

        consultaPaises()

        consultaMunicipios()

        registerEventListenerForForm()

        registerButtonsActions()

        registerConfirmaExclusaoModal()

        registraCadastroModal()

        consultaPessoaList()

    } // cápsula
)