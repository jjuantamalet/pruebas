class Juego {
  constructor() {
    this.estado = "inicio";
    this.barco = new Barco();
    this.escudo = new Escudo();

    // el tiempo lo contamos por frames
    this.duracion = 30 * 60; // los segundos
    this.frames = 0;         // frames

    this.cantRocas = 6;
    this.crearRocas();

    this.y1 = 0;
    this.y2 = -height;
    this.velAgua = 4; 

    // un boton para cada pantalla
    this.btnJugar = new Boton("JUGAR", 300, 250, 200, 60);
    this.btnVolverGanaste = new Boton("VOLVER AL INICIO", 250, 260, 300, 60);
    this.btnVolverPerdiste = new Boton("VOLVER AL INICIO", 250, 260, 300, 60);
    
    this.audioReproduciendose = false;
    this.finAudioActivado = false;
  }

  crearRocas() {
    this.rocas = [];
    for (let i = 0; i < this.cantRocas; i++) {
      this.rocas[i] = new Roca();
    }
  }

  actualizar() {
    if (this.estado === "jugando") {
      // Reproducir sonido de río en loop
      if (!this.audioReproduciendose) {
        s_rio.loop();
        s_rio.setVolume(0.5);
        this.audioReproduciendose = true;
      }

      this.frames++;

      if (this.frames >= this.duracion) {
        this.estado = "final";
        s_rio.stop();
        if (!this.finAudioActivado) {
          s_victoria.play();
          this.finAudioActivado = true;
        }
      } else {
        // movimiento del barco
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65) || keyIsDown(97)) {
          this.barco.moverIzquierda();
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(100)) {
          this.barco.moverDerecha();
        }

        // movimiento de las rocas y colision
        for (let i = 0; i < this.cantRocas; i++) {
          this.rocas[i].caer(this.barco);
          if (this.rocas[i].chocaCon(this.barco)) {
            if (this.barco.tieneEscudo) {
              // el escudo absorbe UN impacto y se pierde
              this.barco.tieneEscudo = false;
              s_escudoRoto.play();
              this.rocas[i].volverAArrancar(this.barco);
            } else {
              this.estado = "perdio";
              s_rio.stop();
              if (!this.finAudioActivado) {
                s_barcoRoto.play();
                this.finAudioActivado = true;
              }
            }
          }
        }

        // movimiento del escudo
        this.escudo.caer();
        if (this.escudo.chocaCon(this.barco)) {
          this.barco.tieneEscudo = true;
          s_escudoAgarrar.play();
          this.escudo.volverAArrancar();
        }
      }
    }
  }

  dibujar() {
    if (this.estado === "inicio") {
      background(30, 40, 50);
      this.dibujarInicio();
    } else if (this.estado === "jugando") {
      
      imageMode(CORNER);
      image(aguaImg, 0, this.y1, width, height);
      
      push();
      translate(0, this.y2);
      scale(1, -1);
      image(aguaImg, 0, -height, width, height);
      pop();
      
      this.y1 += this.velAgua;
      this.y2 += this.velAgua;
      if (this.y1 >= height) this.y1 = this.y2 - height;
      if (this.y2 >= height) this.y2 = this.y1 - height;

      for (let i = 0; i < this.cantRocas; i++) {
        this.rocas[i].dibujar();
      }
      this.escudo.dibujar();
      this.barco.dibujar();
      
      this.dibujarTimer();
      this.dibujarIndicadorEscudo();
      
    } else if (this.estado === "final") {
      this.dibujarFinal();
    } else {
      this.dibujarPerdio();
    }
  }

  dibujarInicio() {
    fill(255);
    textSize(40);
    textAlign(CENTER, BASELINE);
    text("SUBERCASEAUX EN EL RIO", width/2, 120);
    this.btnJugar.dibujar();
  }

  click() {
    if (this.estado === "inicio" && this.btnJugar.mouseEncima()) {
      this.estado = "jugando";
    } else if (this.estado === "final" && this.btnVolverGanaste.mouseEncima()) {
      this.volverAlInicio();
    } else if (this.estado === "perdio" && this.btnVolverPerdiste.mouseEncima()) {
      this.volverAlInicio();
    }
  }

  dibujarTimer() {
    let segundos = int((this.duracion - this.frames) / 60) + 1;
    fill(255);
    textAlign(LEFT, BASELINE);
    textSize(20);
    text("Tiempo: " + segundos, 15, 30);
  }

  dibujarIndicadorEscudo() {
    textSize(20);
    textAlign(RIGHT, BASELINE);
    if (this.barco.tieneEscudo) {
      fill(255, 220, 0);
      text("Escudo: SI", width - 15, 30);
    } else {
      fill(255);
      text("Escudo: NO", width - 15, 30);
    }
  }

  dibujarFinal() {
    background(0);
    fill(0, 180, 0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("¡GANASTE!", width / 2, height / 2 - 40);
    this.btnVolverGanaste.dibujar();
  }

  dibujarPerdio() {
    background(0);
    fill(200, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("PERDISTE", width / 2, height / 2 - 40);
    this.btnVolverPerdiste.dibujar();
  }

  volverAlInicio() {
    if (this.estado === "final" || this.estado === "perdio") {
      this.barco = new Barco();
      this.escudo = new Escudo();
      this.frames = 0;
      this.crearRocas();
      this.estado = "inicio";
      this.audioReproduciendose = false;
      this.finAudioActivado = false;
    }
  }
}
