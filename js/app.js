let encriptarBtn = document.querySelector(".encriptarButton");
let desencriptarBtn = document.querySelector(".desencriptarButton");
let mensajeContainer = document.querySelector(".mensajeContainer");
let errorContainer = document.querySelector(".errorContainer");
let copiarBtn = document.querySelector(".copiar");
let copiarP = document.querySelector(".copiarMsj");
let circulos = document.querySelectorAll(".circle");

let habilitado = true;

addEventListener("load", function() {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})


const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function esMayusculayAcento(letra) {
  let salida = false;
  var letras = "ABCDEFGHYJKLMNÑOPQRSTUBWXYZ";
  letrasinAcentos = removeAccents(letra);
  if (letrasinAcentos !== letra) {
    salida = true;
  }
  else {
    for (i = 0; i < letra.length; i++) {
      if (letras.indexOf(letra.charAt(i), 0) != -1) {
        salida = true;
      }
    }
  }
  return salida;

}

function hover(e) {
  e.target.setAttribute('src', '../img/button_hover.png');
}

function unhover(e) {
  e.target.setAttribute('src', '../img/button.jpg');
}

function prenderCirculos() {
  habilitado = false;
  circulos.forEach((circulo, index) => {
    setTimeout(() => { circulo.setAttribute('src', '../img/circleOn.jpg'); }, 500 * index);
  })
}

function apagarCirculos() {
  habilitado = true;
  circulos.forEach((circulo, index) => {
    circulo.setAttribute('src', '../img/circleOff.jpg');
  })
}

function encriptar() {
  if (habilitado) {
    let textArea = document.querySelector(".textInput");
    let texto = textArea.value;

    if (esMayusculayAcento(texto)) {
      Swal.fire({
        icon: 'error',
        title: 'Solo minusculas y sin acentos...',
        text: 'Ingrese solo letras minusculas y sin acentos!',
      })
      textArea.value = "";
    }
    else {
      texto = texto.replaceAll("e", "enter");
      texto = texto.replaceAll("i", "imes");
      texto = texto.replaceAll("a", "ai");
      texto = texto.replaceAll("o", "ober");
      texto = texto.replaceAll("u", "ufat");
      let mensajeArea = document.querySelector(".mensaje");
      prenderCirculos();
      textArea.value = "ENCRIPTANDO";
      setTimeout(() => {
        mensajeContainer.classList.remove("hidden");
        errorContainer.classList.add("hidden");
        mensajeArea.textContent = texto
        textArea.value = "";
        apagarCirculos();
      }, 500 * circulos.length);
    }
  }

}

function desencriptar() {
  if (habilitado) {
    let textArea = document.querySelector(".textInput");
    let texto = textArea.value;
    let mensaje = "";
    if (esMayusculayAcento(texto)) {
      Swal.fire({
        icon: 'error',
        title: 'Solo minusculas y sin acentos...',
        text: 'Ingrese solo letras minusculas y sin acentos!',
      })
      textArea.value = "";
    }
    else {
      texto = textArea.value;
      for (let i = 0; i < texto.length; i++) {
        switch (texto[i]) {
          case 'a':
            mensaje = mensaje + 'a';
            i = i + 1;
            break;
          case 'e':
            mensaje = mensaje + 'e';
            i = i + 4;
            break;
          case 'i':
            mensaje = mensaje + 'i';
            i = i + 3;
            break;
          case 'o':
            mensaje = mensaje + 'o';
            i = i + 3;
            break;
          case 'u':
            mensaje = mensaje + 'u';
            i = i + 3;
            break;

          default:
            mensaje = mensaje + texto[i];
            break;
        }
      }

      prenderCirculos();
      textArea.value = "DESENCRIPTANDO";
      setTimeout(() => {
        apagarCirculos();
        if (!texto.includes("enter") && !texto.includes("imes") && !texto.includes("ai") && !texto.includes("ober") && !texto.includes("ufat")) {
          mensajeContainer.classList.add("hidden");
          errorContainer.classList.remove("hidden");
        }
        else {
          mensajeContainer.classList.remove("hidden");
          errorContainer.classList.add("hidden");
          let mensajeArea = document.querySelector(".mensaje");
          mensajeArea.textContent = mensaje;
        }

        textArea.value = "";

      }, 500 * circulos.length);
    }
  }
}

function copiar() {
  var codigoACopiar = document.getElementById('textoACopiar');
  var seleccion = document.createRange();
  seleccion.selectNodeContents(codigoACopiar);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(seleccion);
  var res = document.execCommand('copy');
  window.getSelection().removeRange(seleccion);

  copiarP.textContent = "COPIADO"
  setTimeout(() => { copiarP.textContent = "COPIAR"; }, 3000);

}


encriptarBtn.addEventListener("mouseover", hover);
encriptarBtn.addEventListener("mouseout", unhover);
encriptarBtn.addEventListener("click", encriptar)

desencriptarBtn.addEventListener("mouseover", hover);
desencriptarBtn.addEventListener("mouseout", unhover);
desencriptarBtn.addEventListener("click", desencriptar)

copiarBtn.addEventListener("click", copiar);


