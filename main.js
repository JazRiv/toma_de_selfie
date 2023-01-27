var texto = document.getElementById("textbox");
var reconocer_voz = window.webkitSpeechRecognition;
var reconocimiento = new reconocer_voz();
reconocimiento.lang = "es-MX";

function start(){
    texto.innerHTML = "";
    reconocimiento.start();
}
reconocimiento.onresult = function(evento){
    console.log(evento);
    var texto_detectado = evento.results[0][0].transcript;
    texto.innerHTML = texto_detectado
    hablar(texto_detectado)
    if (texto_detectado.toLowerCase() == "toma mi selfie"){
        Webcam.attach(camara);
        hablar("tomando selfie en cinco segundos");
        setTimeout(tomar_foto, 5000);
    }
}

function hablar(mensaje){
    var leer_en_voz_alta = window.speechSynthesis;
    var lectura = new SpeechSynthesisUtterance(mensaje);
    lectura.lang = "es-MX";
    leer_en_voz_alta.speak(lectura);
}

var camara = document.getElementById("camera");
Webcam.set({
    width:360,
    height:260,
    image_format:"jpeg",
    jpeg_quality:90
});

function tomar_foto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="foto" src="'+ data_uri + '">';
        guardar_foto();
    })
}

function guardar_foto(){
    link = document.getElementById("link");
    foto = document.getElementById("foto").src;
    link.href = foto;
    link.click();
}