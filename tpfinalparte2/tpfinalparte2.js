// SUBERCASEAUX EN EL RIO
//Juan Mendoza Tamalet y Mateo Bautista Rodriguez
//
// Clases que vamos a necesitar:
//  - Barco:   jugador. En proceso
//  - Roca:    obstaculo que baja por el rio. En proceso
//  - Escudo:  power-up que baja por el rio. En proceso
//  - Boton:   boton clickeable (iniciar, reiniciar, creditos, volver). En proceso
//  - Juego:   es la clase principal, manejo pantallas, listas y colisiones. En proceso
//  - Sonidos y sprites: por hacer

let juego;
let aguaImg;
let canoaImg = [];
let rocaImg = [];
let escudoImg = [];

let s_rio, s_barcoRoto, s_escudoAgarrar, s_escudoRoto, s_victoria;

function preload() {
  aguaImg = loadImage('data/agua.png');
  for (let i = 1; i <= 15; i++) {
    canoaImg.push(loadImage('data/sprite' + nf(i, 2) + '.png'));
  }
  for (let i = 1; i <= 5; i++) {
    rocaImg.push(loadImage('data/roca_0' + i + '.png'));
  }
  for (let i = 1; i <= 3; i++) {
    escudoImg.push(loadImage('data/escudo_0' + i + '.png'));
  }

  // Cargar sonidos
  s_rio = loadSound('data/rio.mp3');
  s_barcoRoto = loadSound('data/barco_roto.mp3');
  s_escudoAgarrar = loadSound('data/escudo_agarrar.mp3');
  s_escudoRoto = loadSound('data/escudo_roto.mp3');
  s_victoria = loadSound('data/victoria.mp3');
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function mousePressed() {
  juego.click();
}
