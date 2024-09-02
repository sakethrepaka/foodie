export const decodePolyline = (encoded) => {
    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates = [];
  
    while (index < encoded.length) {
      let shift = 0;
      let result = 0;
      let byte;
  
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
  
      shift = 0;
      result = 0;
  
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;
  
      coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
  
    return coordinates;
  };
  