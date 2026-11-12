class Escudo {
  constructor() {
    this.volverAArrancar();
  }

  dibujar() {
    push();
    imageMode(CENTER);
    image(escudoImg[0], this.x, this.y, this.tam * 2, this.tam * 2);
    pop();
  }

  caer() {
    this.y += this.velY;
    if (this.y > height + this.tam) {
      this.volverAArrancar();
    }
  }

  chocaCon(barco) {
    let distan = dist(barco.x, barco.y, this.x, this.y);
    return distan < barco.tam / 2 + this.tam / 2;
  }

  volverAArrancar() {
    this.tam = 24;
    this.x = random(this.tam / 2, width - this.tam / 2);
    this.y = random(-1200, -500); 
    this.velY = random(4, 6);
  }
}
