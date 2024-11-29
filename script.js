// Initialize the map
var map = L.map('map', {
    center: [50.064546423603595, 19.940803796023513],
    zoom: 14,
    minZoom: 3, // Set the minimum zoom level
    zoomControl: false, // Disable zoom control (buttons)
    maxBounds: [
        [-90, -180], // Bottom-left corner (latitude, longitude)
        [90, 180] // Top-right corner (latitude, longitude)
    ],
    maxBoundsViscosity: 1.0 // Prevents the user from zooming or panning beyond the bounds
});

// Create a tile layer and add it to the map
var terrainLayer = L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=YxZVmFFoKyJURt8BGoXr', {
    attribution: '&copy; <a href="https://www.maptiler.com/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

terrainLayer.getContainer().style.filter = 'grayscale(55%)';

let buttonSound1 = new Audio('./buttonSound.mp3');

var RedheartIcon = L.icon({
    iconUrl: './icons/icon.png',
    iconSize: [25, 25]
});

var BlueheartIcon = L.icon({
    iconUrl: './icons/iconBlue.png',
    iconSize: [25, 25]
});

var GreenheartIcon = L.icon({
    iconUrl: './icons/iconGreen.png',
    iconSize: [25, 25]
});

var YellowheartIcon = L.icon({
    iconUrl: './icons/iconYellow.png',
    iconSize: [25, 25]
});

var PinkheartIcon = L.icon({
    iconUrl: './icons/iconPink.png',
    iconSize: [25, 25]
});


// Add click event to the map for creating new memory markers
map.on('click', function (e) {
    buttonSound.play();
    // Popup content with memory input fields
    const popupContent = `
      <div class="popup-content" style="overflow-x: hidden;">
        <textarea id="memoryText" placeholder="Describe your memory..." rows="3" style="width:100%;"></textarea>
        
        <!-- Color selection radios -->
        <div style="margin-top: 10px;">
         <div style="padding: 0; margin: 0; display: flex; justify-content: space-between">
          <label>
              <input type="radio" name="color" value="Red" /> Red
          </label>
          <label>
              <input type="radio" name="color" value="Green" /> Green
          </label>
          <label>
              <input type="radio" name="color" value="Blue" /> Blue
          </label>
          <label>
              <input type="radio" name="color" value="Yellow" /> Yellow
          </label>
          <label>
              <input type="radio" name="color" value="Pink" /> Pink
          </label>

          </div>
             
            <div style="display: flex; gap: 5px">
                <label for="coreMemory">Core Memory?</label>
                <input type="checkbox" name="coreMemory" id="">   
            </div>
             
        </div>
        
        <input type="file" id="imageInput" accept="image/*" multiple style="margin-top: 10px;">
        
        <button onclick="saveMemory(${e.latlng.lat}, ${e.latlng.lng}, this)">Save Memory</button>
      </div>
    `;


    // Open the popup with form fields at the clicked location
    L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
});

let markersArray = [];

var marker1 = L.marker([50.064546423603595, 19.940803796023513], {
    icon: RedheartIcon
}).addTo(map).bindPopup(`
    <p>This is the place where I saw you for the first time. You looked amazing and I was so happy to meet you.</p>
`);

markersArray.push(marker1);


let marker3 = L.marker([50.06672863383658, 19.938786983932154], {
    icon: GreenheartIcon
}).addTo(map).bindPopup(`
    <p>This was our second date?! It was all downhill from there... Can't get better than our bunny date...</p>
    <div>
       <img src="./images/bunnies.png" style="width: 100%; display: block; margin: auto; margin-top: 10px;"> 

    </div>
`);

markersArray.push(marker3);

let marker4 = L.marker([50.05546212030457, 19.93214930681944], {
    icon: YellowheartIcon
}).addTo(map).bindPopup(`
    <p>This is where we did bicycle together:)</p>
    <div>
       <img src="./images/bicycles.png" style="width: 100%;  display: block; margin: auto;"> 
    </div>
`);

markersArray.push(marker4);

let marker5 = L.marker([50.061941127548536, 19.90780470781268], {
    icon: RedheartIcon
}).addTo(map).bindPopup(`
    <p>This is where we rollerbladed for the first time:)</p>
    <p>I was so scared but suprisingly you were a perfect teacher and I only fell 200 times...</p>
`);

markersArray.push(marker5);

let marker6 = L.marker([51.10887903978614, 17.038468654509543], {
    icon: GreenheartIcon
}).addTo(map).bindPopup(`
    <p>This was our first trip. I'll never forget this trip because it really brought us closer. (We have to go back there)</p>
    <div>
        <img src="./images/wroclaw2.jpg" style="width: 100%; display: block; margin: auto;"> 
    </div>
`);

markersArray.push(marker6);


let marker8 = L.marker([50.0679852707229, 20.01475755509682], {
    icon: BlueheartIcon
}).addTo(map).bindPopup(`
    <p>First time trying rollerskating... we tried no...?!</p>
`);

markersArray.push(marker8);

let marker9 = L.marker([50.0630102969585, 19.90340873912342], {
    icon: GreenheartIcon
}).addTo(map).bindPopup(`
    <p>First time we both said the L word...</p>
`);
markersArray.push(marker9);

let marker10 = L.marker([50.068452888038905, 19.904244997294548], {
    icon: PinkheartIcon
}).addTo(map).bindPopup(`
    <p>Here was the first concert we had together. Maybe i couldn't understand much but I loved it:)</p>
   
`);


markersArray.push(marker10);




markersArray.forEach(marker => {
    marker.on('click', function () {
        map.flyTo([marker.getLatLng().lat, marker.getLatLng().lng], 14, {
            duration: 2.5 // duration in seconds for the flyTo animation
        });
        marker.openPopup();
        buttonSound.play();
    });
});



let randomMemoryBtn = document.getElementById('random');

//Implement showing a random memory
randomMemoryBtn.onclick = function () {
    buttonSound.play();
    let randomNumber = getRandomNumber(markersArray.length);
    let randomMarker = markersArray[randomNumber];

    map.flyTo([randomMarker.getLatLng().lat, randomMarker.getLatLng().lng], 14, {
        duration: 2.5
    });
    randomMarker.openPopup();

}

function changeView(element) {
    buttonSound.play();
    // Get latitude and longitude from the data attributes
    const lat = parseFloat(element.getAttribute('data-lat'));
    const lon = parseFloat(element.getAttribute('data-lon'));

    // Loop through markersArray to find the matching marker
    for (let marker of markersArray) {
        // Check if the marker's position matches the data attributes
        if (marker.getLatLng().lat === lat && marker.getLatLng().lng === lon) {
            

            map.flyTo([lat, lon], 14, {
                duration: 2.5 // duration in seconds for the flyTo animation
            });
            marker.openPopup();
            break; 
        }
    }
}

function saveMemory(lat, lon, element) {
    buttonSound.play();
    // Get the popup container (the button's parent element)
    const popupContent = element.parentElement;

    // Retrieve the textarea value, image files, and selected color
    const memoryText = popupContent.querySelector('#memoryText').value;
    const imageInput = popupContent.querySelector('#imageInput');
    const images = imageInput.files;

    // Get the selected color from the radio buttons
    const selectedColor = popupContent.querySelector('input[name="color"]:checked').value;

    // Initialize an HTML string to hold image elements
    let imageHTML = '';
    for (let i = 0; i < images.length; i++) {
        const imgURL = URL.createObjectURL(images[i]);
        imageHTML += `<img src="${imgURL}" style="width: 100%; display: block; margin: auto; margin-top: 10px;">`;
    }

    // Select the icon based on the selected color
    let tempIcon;
    switch (selectedColor.toLowerCase()) {
        case 'red':
            tempIcon = RedheartIcon;
            break;
        case 'green':
            tempIcon = GreenheartIcon;
            break;
        case 'blue':
            tempIcon = BlueheartIcon;
            break;
        case 'yellow':
            tempIcon = YellowheartIcon;
            break;
        case 'pink':
            tempIcon = PinkheartIcon;
            break;
        default:
            tempIcon = YellowheartIcon; // Default icon if no color is selected
    }

    // Create a new marker with the user-provided content
    let markerTemp = L.marker([lat, lon], {
        icon: tempIcon
    }).addTo(map).bindPopup(`
        <p>${memoryText}</p>
        <div>${imageHTML}</div>
    `);

    // Optionally, open the popup immediately after adding
    markerTemp.openPopup();
}



let lastNumber = null;

function getRandomNumber(n) {
    let randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * n);
    } while (randomNumber === lastNumber);

    lastNumber = randomNumber;
    return randomNumber;
}

// Create a function to generate a random rightward movement within a small range
function getRightwardLatLng(startLatLng, range) {
    const lngOffset = Math.random() * range; // Only positive longitude offset to move right
    return [startLatLng.lat, startLatLng.lng + lngOffset];
}

// custom icon for the "us" marker
const personIcon = L.icon({
    iconUrl: './icons/us.png',
    iconSize: [45, 45],
    iconAnchor: [30, 10] 
});


const startLatLng = {
    lat: 50.056,
    lng: 19.9458
}; 
const usMarker = L.marker(startLatLng, {
    icon: personIcon
}).addTo(map).bindPopup(`
    <p>Us taking our dog on a walk.</p>
   
`).openPopup();

// Function to gradually move to the right 
function moveRightward(marker) {
    const startLatLng = marker.getLatLng();
    const targetLatLng = getRightwardLatLng(startLatLng, 0.009); // Small increment to the right

    const totalFrames = 200; 
    let frame = 0;

    const interval = setInterval(() => {
        frame++;

        
        const lat = startLatLng.lat; 
        const lng = startLatLng.lng + ((targetLatLng[1] - startLatLng.lng) * (frame / totalFrames));

        
        marker.setLatLng([lat, lng]);

        
        if (frame >= totalFrames) {
            clearInterval(interval);
            
            moveRightward(marker);
        }
    }, 100); 
}


moveRightward(usMarker);