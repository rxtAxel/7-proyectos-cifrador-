const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const rango = document.getElementById("rango");
const num = document.getElementById("num");
const tabla = document.getElementById("tabla");
const btnModo = document.getElementById("btn-modo");
const btnDado = document.getElementById("btn-dado");
const btnCopiar = document.getElementById("btn-copiar");
const aviso = document.getElementById("aviso");

let cifrando = true;

function quitarTildes(texto) {
    return texto
        .replace(/[ÁÀÄ]/g, "A")
        .replace(/[ÉÈË]/g, "E")
        .replace(/[ÍÌÏ]/g, "I")
        .replace(/[ÓÒÖ]/g, "O")
        .replace(/[ÚÙÜ]/g, "U");
}

function convertir() {
    const texto = quitarTildes(mensaje.value.toUpperCase());
    const desp = parseInt(rango.value);
    let nuevo = "";

    for (let i = 0; i < texto.length; i++) {
        const letra = texto[i];
        const pos = alfabeto.indexOf(letra);

        if (pos === -1) {
            nuevo += letra;
        } else if (cifrando) {
            nuevo += alfabeto[(pos + desp) % alfabeto.length];
        } else {
            nuevo += alfabeto[(pos - desp + alfabeto.length) % alfabeto.length];
        }
    }

    resultado.textContent = nuevo === "" ? "..." : nuevo;
}

function dibujarTabla() {
    const desp = parseInt(rango.value);
    let arriba = "";
    let abajo = "";
    for (let i = 0; i < alfabeto.length; i++) {
        arriba += alfabeto[i] + " ";
        abajo += alfabeto[(i + desp) % alfabeto.length] + " ";
    }
    tabla.textContent = arriba + "\n" + abajo;
}

function actualizar() {
    num.textContent = rango.value;
    dibujarTabla();
    convertir();
}

mensaje.addEventListener("input", convertir);
rango.addEventListener("input", actualizar);

btnModo.addEventListener("click", () => {
    cifrando = !cifrando;
    btnModo.textContent = cifrando ? "Modo: CIFRAR" : "Modo: DESCIFRAR";
    convertir();
});

btnDado.addEventListener("click", () => {
    rango.value = Math.floor(Math.random() * 26) + 1;
    actualizar();
});

btnCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(resultado.textContent).then(() => {
        aviso.textContent = "¡copiado!";
        setTimeout(() => { aviso.textContent = ""; }, 1500);
    });
});

actualizar();
