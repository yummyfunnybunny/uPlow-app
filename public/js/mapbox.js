export const displayMap = (locations) => {
  console.log("MAPBOX LOCATIONS:");
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
    marker.classList.add("fa-house-user");

    // add event listener to markers
    console.log(location);
    marker.addEventListener("click", () => {
      // de-select all markers, than select the clicked one
      const markers = document.querySelectorAll(".mapboxgl-marker");
      markers.forEach((el) => {
        el.classList.remove("mapbox-marker-selected");
      });
      marker.classList.add("mapbox-marker-selected");

      // save all nodes that we will dynamically render location data into
      const coverImage = document.querySelector(".map-item .top img");
      const locationName = document.querySelector(".meta-info h1");
      const ownerPic = document.querySelector(".owner-info .prof-pic img");
      const ownerName = document.querySelector(".owner-info span");
      const instructions = document.querySelector(".notes ul");
      const imageLinks = document.querySelectorAll(".image-gallery a");
      const gallery = document.querySelectorAll(".image-gallery img");

      // Fill all nodes with proper location data
      coverImage.src = `/img/coverImages/${location.coverImage}`;
      locationName.innerText = `${location.name}`;
      ownerPic.src = `/img/users/${location.owner[0].photo}`;
      ownerName.innerText = `${location.owner[0].name}`;
      // const ratingsAvg = document.querySelector('.meta-info div');
      instructions.innerHTML = "";
      location.plowInstructions.forEach((note) => {
        const noteItem = document.createElement("li");
        noteItem.innerText = note;
        instructions.appendChild(noteItem);
      });
      imageLinks.forEach((link, idx) => {
        link.href = `/img/locations/driveway${idx + 1}.jpg`;
      });
      gallery.forEach((img, idx) => {
        img.src = `/img/locations/driveway${idx + 1}.jpg`;
      });
    });

    // b. Add Markers to map
    new mapboxgl.Marker({
      element: marker,
      anchor: "bottom", // sets the origin of the sprite you are generating
    })
      .setLngLat(location.location.coordinates)
      .addTo(map);

    // c. Add popup info
    // new mapboxgl.Popup({
    //   offset: 30,
    //   closeButton: false,
    //   closeOnClick: true,
    // })

    //   .setLngLat(location.location.coordinates)
    //   .setHTML(`<p>${location.name}`)
    //   .addTo(map);

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
