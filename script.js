// === Alternador de tema claro/escuro ===
// Verifica se o usuário já tinha salvo uma preferência de tema
const btnTema = document.getElementById('btnTema');

if (localStorage.getItem('tema') === 'claro') {
    document.body.classList.add('tema-claro');
    btnTema.textContent = '◐';
}

btnTema.addEventListener('click', function () {
    document.body.classList.toggle('tema-claro');

    // Atualiza o ícone e salva a preferência no localStorage
    if (document.body.classList.contains('tema-claro')) {
        btnTema.textContent = '☼';
        localStorage.setItem('tema', 'claro');
    } else {
        btnTema.textContent = '⦿';
        localStorage.setItem('tema', 'escuro');
    }
});


// === Menu mobile ===
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('aberto');
});

// Fecha o menu quando clica em algum link
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('aberto');
    });
});


// === Validação do formulário de contato ===
const form = document.getElementById('formContato');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // impede o envio padrão da página

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    const sucesso = document.getElementById('sucessoMensagem');

    // Limpa os erros anteriores antes de validar de novo
    limparErros();

    let valido = true;

    // Valida nome
    if (nome.value.trim() === '') {
        mostrarErro('erroNome', 'Por favor, informe seu nome.');
        nome.classList.add('campo-erro');
        valido = false;
    }

    // Valida e-mail
    if (email.value.trim() === '') {
        mostrarErro('erroEmail', 'Por favor, informe seu e-mail.');
        email.classList.add('campo-erro');
        valido = false;
    } else if (!emailValido(email.value.trim())) {
        mostrarErro('erroEmail', 'E-mail inválido. Verifique e tente novamente.');
        email.classList.add('campo-erro');
        valido = false;
    }

    // Valida mensagem
    if (mensagem.value.trim() === '') {
        mostrarErro('erroMensagem', 'A mensagem não pode estar vazia.');
        mensagem.classList.add('campo-erro');
        valido = false;
    }

    // Se tudo ok, "envia" e mostra o sucesso
    if (valido) {
        form.reset();
        sucesso.style.display = 'block';

        // Esconde a mensagem de sucesso depois de 4 segundos
        setTimeout(function () {
            sucesso.style.display = 'none';
        }, 4000);
    }
});

// Mostra a mensagem de erro no span correspondente
function mostrarErro(id, texto) {
    document.getElementById(id).textContent = texto;
}

// Limpa todos os erros dos campos
function limparErros() {
    document.getElementById('erroNome').textContent = '';
    document.getElementById('erroEmail').textContent = '';
    document.getElementById('erroMensagem').textContent = '';

    document.getElementById('nome').classList.remove('campo-erro');
    document.getElementById('email').classList.remove('campo-erro');
    document.getElementById('mensagem').classList.remove('campo-erro');
}

// Valida o formato do e-mail com regex básico
function emailValido(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
}
