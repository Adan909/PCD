// Inicializa mapa Leaflet y añade marcadores para los lugares mencionados
(function(){
  // Coordenadas aproximadas de Managua (WGS84)
  const lugares = [
    { title: 'Catedral Metropolitana', coords: [12.1415, -86.2514], desc: 'Catedral Metropolitana (Catedral de Santiago).'},
    { title: 'Monumento a Rubén Darío', coords: [12.1409, -86.2541], desc: 'Monumento a Rubén Darío.'},
    { title: 'Paseo Xolotlán', coords: [12.1476, -86.2548], desc: 'Malecon y zonas públicas junto a la laguna Xolotlán.'},
    { title: 'Laguna de Tiscapa', coords: [12.1412, -86.2679], desc: 'Laguna de Tiscapa y miradores.'},
    { title: 'Ruinas de la Antigua Catedral', coords: [12.1472, -86.2525], desc: 'Ruinas de la antigua catedral.'},
    { title: 'Parque Luis Alfonso Velásquez', coords: [12.1438, -86.2630], desc: 'Parque urbano para actividades recreativas.'}
  ];

  // Comprobar que Leaflet está cargado
  if(typeof L === 'undefined'){
    const container = document.getElementById('map');
    if(container){
      container.innerHTML = '<div style="padding:18px;color:#333;background:#fff;border-radius:8px">El mapa no pudo cargarse porque la librería Leaflet no está disponible. Comprueba la conexión a internet o intenta de nuevo más tarde.</div>';
    }
    return;
  }

  // Crear mapa centrado en Managua
  const map = L.map('map', { zoomControl: true }).setView([12.142, -86.253], 13);

  // Tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Añadir marcadores con popups
  lugares.forEach(l => {
    const marker = L.marker(l.coords).addTo(map);
    marker.bindPopup(`<strong>${l.title}</strong><br>${l.desc}`);
  });

  // Ajustar bounds para mostrar todos los marcadores
  const group = L.featureGroup(lugares.map(l => L.marker(l.coords)));
  map.fitBounds(group.getBounds().pad(0.15));

  // Forzar recalculo de tamaño (previene canvas en blanco si el contenedor cambió)
  setTimeout(()=>{ try{ map.invalidateSize(); }catch(e){} }, 300);

  // Fallback: si después de un tiempo no hay tiles o el mapa parece no renderizar correctamente,
  // reemplazamos el contenedor por una imagen estática del mapa (servicio: staticmap.openstreetmap.de)
  setTimeout(()=>{
    try{
      const container = document.getElementById('map');
      const tiles = container.querySelectorAll('.leaflet-tile');
      const size = map.getSize();
      const noTiles = !tiles || tiles.length === 0;
      const zeroSize = !size || size.x === 0 || size.y === 0;
      if(noTiles || zeroSize){
        // construir URL estática con marcadores
        const w = Math.max(400, Math.min(1200, Math.round(container.clientWidth)));
        const h = Math.max(240, Math.min(900, Math.round(container.clientHeight)));
        const center = '12.142,-86.253';
        const zoom = 13;
        const markerParams = lugares.map(l => `${l.coords[0]},${l.coords[1]},lightblue1`).join('|');
  // si falla, usar imagen local genérica (SVG) incluida en el proyecto
  const localImg = 'img/map-managua.svg';
  container.innerHTML = `<img src="${localImg}" alt="Mapa de Managua (estático)" class="map-fallback">`;
      }
    }catch(e){
      // si algo falla, no interrumpimos
      console.warn('fallback map check error', e);
    }
  }, 900);
})();
