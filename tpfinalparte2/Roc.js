class Roca {
  constructor() {
    this.x = random(width);
    this.volverAArrancar();
    this.y = random(-400, -50); 
  }

  dibujar() {
    push();
    imageMode(CENTER);
    image(rocaImg[this.imgIndex], this.x, this.y, this.tam + 15, this.tam + 15);
    pop();
  }

  caer(barco) {
    this.y += this.velY;
    // cuando pasa de largo, vuelve a empezar arriba
    if (this.y > height + this.tam) {
      this.volverAArrancar(barco);
    }
  }

  chocaCon(barco) {
    let distan = dist(barco.x, barco.y, this.x, this.y);
    return distan < barco.tam / 2 + this.tam / 2;
  }

  volverAArrancar(barco) {
    this.tam = random(35, 70);   // tam
    this.velY = random(4, 9);    // velocidad
    this.y = -this.tam;
    
    this.imgIndex = floor(random(0, 5));

    let xAnterior = this.x;      // pos anterior

    if (barco && random(100) < 30) {
      this.x = barco.x;
    } else {
      this.x = random(this.tam / 2, width - this.tam / 2);
      while (dist(this.x, 0, xAnterior, 0) < 100) {
        this.x = random(this.tam / 2, width - this.tam / 2);
      }
    }
  }
}
