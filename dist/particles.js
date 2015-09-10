var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Particles = factory();
})(this, function () {
  'use strict';

  var Particles = (function () {
    function Particles(element) {
      _classCallCheck(this, Particles);

      this.element = element;
      this.canvas = document.createElement('canvas');
      this.canvas.width = element.offsetWidth;
      this.canvas.height = element.offsetHeight * 2;
      this.ctx = this.canvas.getContext('2d');

      var particles = this.getParticles(element);
      this.fillCanvasSquare(particles);
    }

    _createClass(Particles, [{
      key: 'getParticles',
      value: function getParticles() {
        var resolution = 5;

        function Particle(x, y) {
          this.x = x;
          this.y = y;
        }

        // fill with text
        this.ctx.font = getComputedStyle(this.element).getPropertyValue('font');
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.element.innerHTML, 10, this.element.offsetHeight);

        // now parse bitmap based on grid
        var data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

        // use a 32-bit buffer as we are only checking if a pixel is set or not
        var buffer32 = new Uint32Array(data.buffer);

        // using two loops here, single loop with index-to-x/y is also an option
        var particles = [];
        for (var y = 0; y < this.canvas.height; y += resolution) {
          for (var x = 0; x < this.canvas.width; x += resolution) {

            //buffer32[] will have a value > 0 (true) if set, if not 0=false
            if (buffer32[y * this.canvas.width + x]) {
              particles.push(new Particle(x, y));
            }
          }
        }

        return particles;
      }
    }, {
      key: 'fillCanvasSquare',
      value: function fillCanvasSquare(particles) {
        var _this = this;

        // render particles
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        particles.forEach(function (p) {
          return _this.ctx.fillRect(p.x - 2, p.y - 2, 3, 3);
        } // just squares here
        );

        this.element.appendChild(this.canvas);
      }
    }, {
      key: 'fillCanvasCircle',
      value: function fillCanvasCircle(particles) {
        var _this2 = this;

        // render particles
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        particles.forEach(function (p) {
          _this2.ctx.beginPath();
          _this2.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          _this2.ctx.closePath();
          _this2.ctx.fill();
        });

        this.element.appendChild(this.canvas);
      }
    }, {
      key: 'drawGrid',
      value: function drawGrid() {
        var width = this.canvas.width;
        var height = this.canvas.height;

        ctx.fillStyle = 'red';
        for (var y = 0; y < height; y += resolution) {
          ctx.fillRect(0, y - 0.5, width, 1);
          for (var x = 0; x < width; x += resolution) {
            ctx.fillRect(x - 0.5, 0, 1, height);
          }
        }
      }
    }]);

    return Particles;
  })();

  ;

  var _particles = Particles;

  return _particles;
});
//# sourceMappingURL=particles.js.map