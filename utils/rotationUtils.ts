function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

// Converte radianos para graus
function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

// Calcula o ângulo (bearing) entre duas coordenadas
export function calculateBearing(start: [number, number], end: [number, number]) {
  const startLat = toRad(start[1]);
  const startLng = toRad(start[0]);
  const endLat = toRad(end[1]);
  const endLng = toRad(end[0]);

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
  
  const brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360; // Garante que seja entre 0 e 360
}