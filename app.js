
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // foi preciso criar a chave cadastrando no site do responsivevoice (key=AsHRegaB, linha 7 index.html)
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // verifica se o número máximo de elementos da lista foi atingido, se sim, limpa a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // o método includes() verifica se o valor passado como parâmetro já existe na lista
        return gerarNumeroAleatorio(); // recursividade: tomar cuidado com valores altos
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // o método push() insere o valor na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // operador ternário
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // recurso utilizado pq o HTML não reconhece Template Strings - retorna string
        //console.log(typeof(mensagmTentativa));
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled'); // retira o atributo 'disabled' do botão reiniciar, buscando-o pelo id, uma vez que o HTML tem mais de um botão
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', ' O número secreto é menor');
        } else {
            exibirTextoNaTela('p', ' O número secreto é maior');
        }
        tentativas++
        limparCampo();
    }
}

function limparCampo() {
    campo = document.querySelector('input');
    campo.value = '';
}

function reiniciarJogo() { // esta função está sendo invocada no index.html
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // desabilita o botão ao reiniciar um novo jogo
}

exibirMensagemInicial();

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Apertadinho - o jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

