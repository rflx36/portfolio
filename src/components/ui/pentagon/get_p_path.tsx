

export default function getPolygonPath(sides = 5, cx: number, cy: number, r: number, cornerRadius = 16) {

  const angleOffset = -Math.PI / 2;

  const vertices = Array.from({ length: sides }, (_, i) => {
    const angle = angleOffset + (2 * Math.PI * i) / sides;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  let d = "";
  for (let i = 0; i < sides; i++) {
    const prev = vertices[(i - 1 + sides) % sides];
    const curr = vertices[i];
    const next = vertices[(i + 1) % sides];

    const toPrev = { x: prev.x - curr.x, y: prev.y - curr.y };
    const toNext = { x: next.x - curr.x, y: next.y - curr.y };

    const lenPrev = Math.hypot(toPrev.x, toPrev.y);
    const lenNext = Math.hypot(toNext.x, toNext.y);

    const cr = Math.min(cornerRadius, lenPrev / 2, lenNext / 2);

    const p1 = {
      x: curr.x + (toPrev.x / lenPrev) * cr,
      y: curr.y + (toPrev.y / lenPrev) * cr,
    };
    const p2 = {
      x: curr.x + (toNext.x / lenNext) * cr,
      y: curr.y + (toNext.y / lenNext) * cr,
    };

    if (i === 0) {
      d += `M ${p1.x},${p1.y}`;
    } else {
      d += ` L ${p1.x},${p1.y}`;
    }

    d += ` Q ${curr.x},${curr.y} ${p2.x},${p2.y}`;
  }
  d += " Z";
  return d;
}