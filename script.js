//Elementos da tela
let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");
let numeros = document.querySelector(".d-1-3");

//Variáveis de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = new Boolean;
let votoNulo = new Boolean;
let votos = new Array;


//Funções da lógica do programa
function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = "";
    numero = "";
    votoBranco = false;
    votoNulo = false;
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += "<div class='numero pisca'></div>";
        } else {
            numeroHtml += "<div class='numero '></div>"
        }

    }
    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter(item => item.numero === numero);

    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    if (candidato.length > 0) {
        candidato = candidato[0];
        if (candidato.vice != undefined) {
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Vice: ${candidato.vice}<br/>Partido:${candidato.partido}`;
        } else {
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido:${candidato.partido}`;
        }
        let fotosHtml = "";
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += '<div class="d-1-image small"><img src="' + candidato.fotos[i].url + '" alt="Candidato">' + candidato.fotos[i].legenda + '</div>'

            } else {
                fotosHtml += '<div class="d-1-image"><img src="' + candidato.fotos[i].url + '" alt="Candidato">' + candidato.fotos[i].legenda + '</div>'

            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO NULO</div>";
        votoNulo = true;
    }
}

function clicou(n) {
    let elNumero = document.querySelector(".numero.pisca");
    if (elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add("pisca")
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    const vontandoBranco = () => {
        votoBranco = true;
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        numeros.innerHTML = " ";
        descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO EM BRANCO</div>";
        lateral.innerHTML = " ";
    }

    (numero.length == 0 || numero.length == etapas[etapaAtual].numeros) && vontandoBranco();
}



function corrige() {
    comecarEtapa();
}
function confirma() {
    const registrarBranco = () => {
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    }
    const registrarNumero = () => {
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    if (numero.length == etapas[etapaAtual].numeros && !votoNulo || votoBranco) {
        document.querySelector("audio").play();
        (votoBranco) ? registrarBranco() : registrarNumero();
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector(".tela").innerHTML = "<div class='aviso--gigante pisca'>FIM<div>"
            console.log(votos)

            setTimeout(()=>window.location.reload(),2300)
        }
        document.querySelector("audio").currentTime = 0;
    }

}

comecarEtapa();