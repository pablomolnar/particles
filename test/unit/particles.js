import particles from '../../src/particles';

describe('particles', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(particles, 'greet');
      particles.greet();
    });

    it('should have been run once', () => {
      expect(particles.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(particles.greet).to.have.always.returned('hello');
    });
  });
});
