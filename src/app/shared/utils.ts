export function distanceInKm(coord1: string, coord2: string) {
  const toRad = (deg: number) => deg * Math.PI / 180;

  const [lat1, lon1] = coord1.split(',').map(Number);
  const [lat2, lon2] = coord2.split(',').map(Number);

  const R = 6371; // Erdradius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export function googleMapsUrlFromCoords(coords: string) {
  const [lat, lon] = coords.split(',').map(v => v.trim());

  return `https://www.google.com/maps?q=${lat},${lon}`;
}

export function googleMapsRouteUrl(startCoords: string, destinationCoords: string) {
  const parse = (coords:string) =>
    coords.split(',').map(v => v.trim());

  const [startLat, startLon] = parse(startCoords);
  const [destLat, destLon] = parse(destinationCoords);

  return `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLon}&destination=${destLat},${destLon}`;
}

export function download(filename:string, text: string, format = 'text/plain') {
  var element = document.createElement('a');
  element.setAttribute('href', `data:${format};charset=utf-8,${encodeURIComponent(text).trim()}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
