class Particles {

  constructor(element) {

    this.element = element;
    this.canvas = document.createElement('canvas');
    this.canvas.width = element.offsetWidth;
    this.canvas.height = element.offsetHeight * 2;
    this.ctx = this.canvas.getContext('2d');

    const particles = this.getParticles(element);
    this.fillCanvasSquare(particles);
  }

  getParticles() {
    const resolution = 5;

    function Particle(x, y) {
      this.x = x;
      this.y = y;
    }

    // fill with text
    this.ctx.font = getComputedStyle(this.element).getPropertyValue('font');
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.element.innerHTML, 10, this.element.offsetHeight);

    // now parse bitmap based on grid
    const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

    // use a 32-bit buffer as we are only checking if a pixel is set or not
    const buffer32 = new Uint32Array(data.buffer);

    // using two loops here, single loop with index-to-x/y is also an option
    const particles = [];
    for (let y = 0; y < this.canvas.height; y += resolution) {
      for (let x = 0; x < this.canvas.width; x += resolution) {

        //buffer32[] will have a value > 0 (true) if set, if not 0=false
        if (buffer32[y * this.canvas.width + x]) {
          particles.push(new Particle(x, y));
        }
      }
    }

    return particles;
  }

  fillCanvasSquare(particles) {

    // render particles
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    particles.forEach(p =>
      this.ctx.fillRect(p.x - 2, p.y - 2, 3, 3) // just squares here
    );

    this.element.appendChild(this.canvas);
  }

  fillCanvasCircle(particles) {

    // render particles
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    particles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fill();
    });

    this.element.appendChild(this.canvas);
  }

  drawGrid() {
    let width = this.canvas.width;
    let height = this.canvas.height;

    ctx.fillStyle = 'red';
    for (let y = 0; y < height; y += resolution) {
      ctx.fillRect(0, y - 0.5, width, 1);
      for (let x = 0; x < width; x += resolution) {
        ctx.fillRect(x - 0.5, 0, 1, height);
      }
    }
  }

};

export default Particles;
