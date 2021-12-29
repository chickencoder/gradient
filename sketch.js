const maxParticles = 15;
const minRadius = 200;
const maxRadius = 700;
const minVelocity = 1;
const maxVelocity = 4;
const particles = [];
const TWO_PI = Math.PI * 2;

let stageWidth = 1920,
  stageHeight = 1080;

// const colors = [
//   [54, 223, 84],
//   [44, 209, 252],
//   [255, 104, 248],
//   [250, 255, 89],
//   [45, 74, 227],
// ];

// const colors = [
//   [47, 255, 173],
//   [0, 62, 255],
//   [255, 0, 190],
//   [255, 121, 231],
// ];

const colors = [
  [0, 255, 125],
  [0, 171, 84],
  [17, 64, 255],
  [1, 33, 166],
  [255, 231, 0],
  [255, 131, 255],
  // [255, 173, 21],
  // [21, 250, 226],
  // [43, 116, 251],
];

function resize(ctx, canvas) {
  const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  canvas.width = stageWidth * pixelRatio;
  canvas.height = stageHeight * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);
}

function setup(ctx, canvas) {
  resize(ctx, canvas);
  window.addEventListener("resize", () => resize(ctx, canvas));

  ctx.globalCompositeOperation = "saturation";

  window.requestAnimationFrame(() => draw(ctx));

  let c = 0;

  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * stageWidth,
      y: Math.random() * stageHeight,
      vx: Math.random() * 4,
      vy: Math.random() * 4,
      radius: Math.random() * (maxRadius - minRadius) + minRadius,
      angle: Math.random(),
      color: colors[c],
    });

    if (++c >= colors.length) {
      c = 0;
    }
  }
}

function draw(ctx) {
  window.requestAnimationFrame(() => draw(ctx));
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.clearRect(0, 0, stageWidth, stageHeight);

  for (const p of particles) {
    p.angle += 0.01;
    p.radius += Math.sin(p.angle);
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) {
      p.vx *= -1;
      p.x += 10;
    } else if (p.x > stageWidth) {
      p.vx *= -1;
      p.x -= 10;
    }

    if (p.y < 0) {
      p.vy *= -1;
      p.y += 10;
    } else if (p.y > stageHeight) {
      p.vy *= -1;
      p.y -= 10;
    }

    ctx.beginPath();
    const g = ctx.createRadialGradient(
      p.x,
      p.y,
      p.radius * 0.01,
      p.x,
      p.y,
      p.radius
    );

    g.addColorStop(0, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 1)`);
    g.addColorStop(1, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0)`);

    ctx.fillStyle = g;
    // ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.arc(p.x, p.y, p.radius, TWO_PI, false);
    ctx.fill();
  }
}

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");

  const ctx = canvas.getContext("2d");
  setup(ctx, canvas);
});
