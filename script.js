// Submit form and send data to Google Sheets
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
document.getElementById("reportForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    const data = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        emergencyType: document.getElementById("emergencyType").value,
        contact: document.getElementById("contact").value,
        description: document.getElementById("description").value
    };

    fetch("https://script.google.com/macros/s/AKfycbxKAF01CrlRTgi5YKmWE9bB6VH6BIt_IwayIPVoEMcoLjRmWwXKsJKhxSmjcfAVpFcn7w/exec", { // Replace with your Web App URL
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
   .then(result => {
    showPopup(); // show popup immediately
    document.getElementById("reportForm").reset();
})
    .catch(err => {
        alert("❌ Error submitting report: " + err);
    });
});
function showPopup() {
  document.getElementById('customPopup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('customPopup').style.display = 'none';
}
