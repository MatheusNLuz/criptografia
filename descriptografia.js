// Função para verificar a senha armazenada em um cookie
function getSavedPassword() {
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let parts = cookie.split('=');
        if (parts[0].trim() === 'senha') {
            return parts[1].trim();
        }
    }
    return null;
}

function getSavedMessage() {
    return localStorage.getItem('mensagemCriptografada');
}

function getSavedMessageOriginal() {
    return localStorage.getItem('chaveCriptografia');
}

$('#message').on('input', function () {
    if ($(this).val().trim() !== '') {
        $('#password-label').show();
    } else {
        $('#password-label').hide();
    }
});


const btnCriptografar = $('#criptografarBtn');

btnCriptografar.on('click', (e) => {
    e.preventDefault();
    let senha = $('#password').val();
    let mensagem = $('#message').val();

    // Verificar se a senha fornecida pelo usuário coincide com a senha armazenada em um cookie
    let senhaSalva = getSavedPassword();
    if (senha !== senhaSalva) {
        alert('Senha incorreta! Por favor, insira a senha correta.');
        return;
    }

    let mensagemSalva = getSavedMessage();
    let messageOriginal = getSavedMessageOriginal();
    if (mensagem == mensagemSalva) {
        // Verificar se já existe um campo de entrada criptografado
        let inputCriptografado = $('#criptografadoText input');

        // Se já existir, apenas atualize o valor
        if (inputCriptografado.length > 0) {
            inputCriptografado.val(messageOriginal);
        } else {
            inputCriptografado = $('<input>');
            inputCriptografado.attr('type', 'text');
            inputCriptografado.attr('readonly', 'readonly');
            inputCriptografado.addClass('input input-bordered w-full max-w-xs');
            inputCriptografado.val(messageOriginal);

            // Adicionar o novo campo de entrada ao DOM
            $('#criptografadoText').append(inputCriptografado);
        }
    } else {
        alert('Mensagem criptografada não existente!');
        return;
    }

});
