export function parseGPXAndCalculateDistance(gpxString: string) {
  // XML parsen
  const parser = new DOMParser();
  const xml = parser.parseFromString(gpxString, "application/xml");

  // Namespace der GPX-Datei
  const ns = "http://www.topografix.com/GPX/1/1";

  // Alle Trackpunkte holen
  const points = Array.from(
    xml.getElementsByTagNameNS(ns, "trkpt")
  ).map(pt => ({
    lat: parseFloat(pt.getAttribute("lat")!),
    lon: parseFloat(pt.getAttribute("lon")!)
  }));

  let totalDistance = 0;

  for (let i = 1; i < points.length; i++) {
    totalDistance += distanceInM(points[i - 1], points[i]);
  }

  const km = totalDistance / 1000;
  return Math.round(km * 100) / 100
}

export function distanceInKMFromCoordinateString(p1: string, p2: string) {
  return Math.round(distanceInM(
    {lat: parseFloat(p1.split(',')[0]), lon: parseFloat(p1.split(',')[1])},
    {lat: parseFloat(p2.split(',')[0]), lon: parseFloat(p2.split(',')[1])},
  ) / 1000 * 100) / 100;
}

// Haversine-Formel
export function distanceInM(p1: any, p2: any) {
  const R = 6371000; // Erdradius in Metern
  const toRad = (deg: any) => deg * Math.PI / 180;

  const dLat = toRad(p2.lat - p1.lat);
  const dLon = toRad(p2.lon - p1.lon);

  const lat1 = toRad(p1.lat);
  const lat2 = toRad(p2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function googleMapsUrlFromCoords(coords: string) {
  const [lat, lon] = coords.split(',').map(v => v.trim());

  return `https://www.google.com/maps?q=${lat},${lon}`;
}

export function googleMapsRouteUrl(startCoords: string, destinationCoords: string) {
  const parse = (coords: string) =>
    coords.split(',').map(v => v.trim());

  const [startLat, startLon] = parse(startCoords);
  const [destLat, destLon] = parse(destinationCoords);

  return `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLon}&destination=${destLat},${destLon}`;
}

export function download(filename: string, text: string, format = 'text/plain') {
  var element = document.createElement('a');
  element.setAttribute('href', `data:${format};charset=utf-8,${encodeURIComponent(text).trim()}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
