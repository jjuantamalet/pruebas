class Boton {
  constructor(texto, x, y, ancho, alto) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  dibujar() {
    if (this.mouseEncima()) {
      fill(255, 150, 0); // hover
    } else {
      fill(255, 220, 0); // estado normal
    }
    rect(this.x, this.y, this.ancho, this.alto);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
  }

  mouseEncima() {
    return mouseX > this.x && mouseX < this.x + this.ancho &&
           mouseY > this.y && mouseY < this.y + this.alto;
  }
}
