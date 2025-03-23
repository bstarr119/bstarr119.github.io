export const Noise = (function () {
  function Grad(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  Grad.prototype.dot2 = function (x, y) {
    return this.x * x + this.y * y;
  };

  const grad3 = [
    new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
    new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
    new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1),
  ];

  const p = [];
  for (let i = 0; i < 256; i++) {
    p[i] = Math.floor(Math.random() * 256);
  }
  const perm = [];
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }

  function perlin(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const a = perm[X] + Y,
      aa = perm[a],
      ab = perm[a + 1];
    const b = perm[X + 1] + Y,
      ba = perm[b],
      bb = perm[b + 1];
    return (
      lerp(
        lerp(grad3[perm[aa] & 11].dot2(x, y), grad3[perm[ba] & 11].dot2(x - 1, y), u),
        lerp(grad3[perm[ab] & 11].dot2(x, y - 1), grad3[perm[bb] & 11].dot2(x - 1, y - 1), u),
        v
      ) * 0.5 + 0.5
    ); // Normalize to 0-1
  }
  return { perlin };
})();
