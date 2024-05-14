$(document).ready(function () {
    let chave = '';
    let characters = "^!\$%&/()=?{[]}+~#-_.:,;<>|\\";
    for (var i = 0; i < 1024; i++) {
        chave += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const btnCriptografar = $('#criptografarBtn');

    btnCriptografar.on('click', (e) => {
        e.preventDefault();
        let senha = $('#password').val();
        let mensagem = $('#message').val();
        let secreta = str_xor(mensagem, chave);

        // Verificar se já existe um campo de entrada criptografado
        let inputCriptografado = $('#criptografadoText input');

        document.cookie = `senha=${senha};expires=${new Date(Date.now() + 3600000).toUTCString()};path=/`;
        localStorage.setItem('mensagemCriptografada', secreta);
        ''
        // Se já existir, apenas atualize o valor
        if (inputCriptografado.length > 0) {
            inputCriptografado.val(secreta);
        } else {
            // Caso contrário, crie um novo campo de entrada somente leitura
            inputCriptografado = $('<input>');
            inputCriptografado.attr('type', 'text');
            inputCriptografado.attr('readonly', 'readonly');
            inputCriptografado.addClass('input input-bordered w-full max-w-xs');
            inputCriptografado.val(secreta);
            
            // Adicionar o novo campo de entrada ao DOM
            $('#criptografadoText').append(inputCriptografado);
        }

    });

    $('#password').on('input', function () {
        if ($(this).val().trim() !== '') {
            $('#criptografarLabel').show();
        } else {
            $('#criptografarLabel').hide();
        }
    });

    function str_xor(s1, s2) {
        var result = '';
        for (var i = 0; i < s1.length; i++) {
            result += String.fromCharCode(s1.charCodeAt(i) ^ s2.charCodeAt(i % s2.length));
        }
        return result;
    }
});
