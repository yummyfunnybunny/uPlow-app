// export const displayMap = (locations) => {
export const displayMap = (locations) => {
  console.log("MAPBOX LOCATIONS:");
  console.log(locations);
  // 1) Save Access Token
  mapboxgl.accessToken =
    "pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg";

  // 2) Create MapBox Map
  var map = new mapboxgl.Map({
    container: "map", // 'map' is the default element ID
    style: "mapbox://styles/yummyfunnybunny/ckm6hzvef23mr17pog9zp7hhk",
    // scrollZoom: false, // disables mouse-scroll zooming on the map
    center: [-71.714059, 43.222486],
    zoom: 15,
    // interactive: false,
  });

  // 3 Create Bounds
  const bounds = new mapboxgl.LngLatBounds();

  // 4) Add Location Markers
  locations.forEach((location) => {
    // a. Create Your Custom Marker
    const marker = document.createElement("div");
    marker.className = "marker";
    marker.classList.add("fas");
    marker.classList.add("fa-map-marker");

    // add event listener to markers
    marker.addEventListener("click", () => {
      const coverImage = document.querySelector(".map-item .top img");
      coverImage.src = `/img/coverImages/${location.coverImage}`;
    });

    // b. Add Markers to map
    new mapboxgl.Marker({
      element: marker,
      anchor: "bottom", // sets the origin of the sprite you are generating
    })
      .setLngLat(location.location.coordinates)
      .addTo(map);

    // c. Add popup info
    new mapboxgl.Popup({
      offset: 30,
      closeButton: true,
      closeOnClick: false,
    })

      .setLngLat(location.location.coordinates)
      .setHTML(
        `<p>${location.name} <br>
        ${location.type}</p>`
      )
      .addTo(map);

    bounds.extend(location.location.coordinates);
  });
  // 5) Fit Bounds
  map.fitBounds(bounds, {
    padding: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });
};
