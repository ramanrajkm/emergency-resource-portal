// Existing function to start training modules
function startTraining(moduleName) {
    const moduleDiv = document.querySelector(`.module[data-title="${moduleName}"]`);
    if (!moduleDiv) return;

    let existingContent = moduleDiv.querySelector('.training-guidelines');
    if (existingContent) {
        existingContent.remove();
        return;
    }

    const guidelinesDiv = document.createElement('div');
    guidelinesDiv.classList.add('training-guidelines');
    guidelinesDiv.style.marginTop = '10px';
    guidelinesDiv.style.padding = '10px';
    guidelinesDiv.style.border = '1px solid #0066cc';
    guidelinesDiv.style.borderRadius = '6px';
    guidelinesDiv.style.backgroundColor = '#e6f0ff';

    if (moduleName === 'Fire Safety') {
        guidelinesDiv.innerHTML = `
            <h4>Fire Safety Guidelines</h4>
            <ul>
                <li>Keep fire extinguishers accessible and know how to use them.</li>
                <li>Install smoke detectors in key areas of your home.</li>
                <li>Have an evacuation plan and practice it regularly.</li>
                <li>Never leave cooking unattended.</li>
                <li>Keep flammable materials away from heat sources.</li>
            </ul>
        `;
    } else if (moduleName === 'First Aid Basics') {
        guidelinesDiv.innerHTML = `
            <h4>First Aid Guidelines</h4>
            <ul>
                <li>Learn CPR and the Heimlich maneuver.</li>
                <li>Keep a first aid kit handy and stocked.</li>
                <li>Know how to treat burns, cuts, and fractures.</li>
                <li>Stay calm and assess the situation before acting.</li>
                <li>Call emergency services if the situation is severe.</li>
            </ul>
        `;
    }

    moduleDiv.appendChild(guidelinesDiv);
}

// Form submission logic
document.getElementById("reportForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    const contactInput = document.getElementById("contact").value.trim();

    // Validate contact number length (must be exactly 10 digits)
    if (!/^\d{10}$/.test(contactInput)) {
        alert("❌ Please enter a valid 10-digit contact number.");
        return;
    }

    const data = {
        name: document.getElementById("name").value.trim(),
        location: document.getElementById("location").value.trim(),
        emergencyType: document.getElementById("emergencyType").value,
        contact: contactInput,
        description: document.getElementById("description").value.trim()
    };

    fetch("https://script.google.com/macros/s/AKfycbxKAF01CrlRTgi5YKmWE9bB6VH6BIt_IwayIPVoEMcoLjRmWwXKsJKhxSmjcfAVpFcn7w/exec", { // Replace with your Web App URL
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.status === "success") {
            showPopup();
            document.getElementById("reportForm").reset();
        } else {
            alert("❌ Error submitting report: " + result.message);
        }
    })
    .catch(err => {
        alert("❌ Error submitting report: " + err);
    });
});

// Popup show/hide functions
function showPopup() {
    document.getElementById('customPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('customPopup').style.display = 'none';
}

// === Auto location feature ===

// Call this function on clicking the "Use My Location" button
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Use reverse geocoding to get a human-readable address
    reverseGeocode(lat, lon);
}

function error() {
    alert("Unable to retrieve your location.");
}

function reverseGeocode(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            document.getElementById('location').value = data.display_name;
        } else {
            document.getElementById('location').value = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
        }
    })
    .catch(() => {
        document.getElementById('location').value = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
    });
}
function findNearby() {

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}

}

function showMap(position) {

let lat = position.coords.latitude;
let lon = position.coords.longitude;

let map = document.getElementById("mapContainer");
if(!map) return;

map.innerHTML = `
<iframe
width="100%"
height="450"
style="border:0"
loading="lazy"
allowfullscreen
src="https://www.google.com/maps?q=${lat},${lon}&z=14&output=embed">
</iframe>
`;

}

function showError() {
alert("Unable to retrieve your location.");
}
