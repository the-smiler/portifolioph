/*
  IA usada: não foi utilizada.
  Objetivo: implementar interações do portfólio conforme requisitos do projeto.
*/

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');
const yearElement = document.getElementById('ano-atual');
const form = document.querySelector('.contact-form');

function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return 'Bom dia';
  } else if (hora >= 12 && hora < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
}

function atualizarSaudacao() {
  const horaAtual = new Date().getHours();
  const saudacao = obterSaudacao(horaAtual);
  const titulo = document.querySelector('.hero-text h1');

  if (titulo) {
    titulo.innerHTML = `${saudacao}, eu sou <span>Ph</span>.<br />Crio interfaces com foco em experiência e impacto.`;
  }
}

function alternarTema() {
  document.body.classList.toggle('tema-claro');
  const temaAtivo = document.body.classList.contains('tema-claro');
  themeToggle.textContent = temaAtivo ? 'Escuro' : 'Tema';
}

function validarFormulario() {
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const consentimento = document.getElementById('consentimento');
  let valido = true;

  const limparErro = (campoId) => {
    const elemento = document.querySelector(`[data-error-for="${campoId}"]`);
    if (elemento) elemento.textContent = '';
  };

  limparErro('nome');
  limparErro('email');
  limparErro('mensagem');
  limparErro('consentimento');

  if (!nome.value.trim()) {
    document.querySelector('[data-error-for="nome"]').textContent = 'Informe seu nome.';
    valido = false;
  }

  if (!email.value.trim()) {
    document.querySelector('[data-error-for="email"]').textContent = 'Informe seu e-mail.';
    valido = false;
  } else if (!email.value.includes('@') || !email.value.includes('.')) {
    document.querySelector('[data-error-for="email"]').textContent = 'Digite um e-mail válido.';
    valido = false;
  }

  if (!mensagem.value.trim()) {
    document.querySelector('[data-error-for="mensagem"]').textContent = 'Escreva uma mensagem.';
    valido = false;
  } else if (mensagem.value.trim().length < 20) {
    document.querySelector('[data-error-for="mensagem"]').textContent = 'A mensagem deve ter pelo menos 20 caracteres.';
    valido = false;
  }

  if (!consentimento.checked) {
    document.querySelector('[data-error-for="consentimento"]').textContent = 'Você precisa aceitar o uso dos dados.';
    valido = false;
  }

  return valido;
}

function preencherAno() {
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const aberta = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(aberta));
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', alternarTema);
}

if (form) {
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const formValido = validarFormulario();
    const successMessage = document.querySelector('.form-success');

    if (formValido) {
      if (successMessage) {
        successMessage.textContent = 'Mensagem enviada com sucesso!';
      }
      form.reset();
    } else if (successMessage) {
      successMessage.textContent = '';
    }
  });
}

atualizarSaudacao();
preencherAno();
