// Add a click event listener to the "Get Current Location" button
document.getElementById('getLocation').addEventListener('click', getCurrentLocation);

// Function to handle geolocation
function getCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationField = document.getElementById('location');

            // Reverse geocode the coordinates to get address details
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then((response) => response.json())
                .then((data) => {
                    const address = data.display_name;
                    locationField.value = address;
                })
                .catch((error) => {
                    console.error('Error getting location:', error.message);
                });
        }, function (error) {
            console.error('Error getting location:', error.message);
        });
    } else {
        alert('Geolocation is not supported in your browser.');
    }
}

// Clear Location button click event
document.getElementById('clearLocation').addEventListener('click', function () {
    document.getElementById('location').value = ''; // Clear the location input field
});

// Function to clear the form
function clearForm() {
    const doorForm = document.querySelector('.door-form');
    doorForm.reset(); // Reset the form
}

// Add a click event listener to the "Clear the form" button
document.getElementById('clearForm').addEventListener('click', clearForm);

// Function to dynamically update shape type options based on project type selection
document.getElementById('projectType').addEventListener('change', function () {
    const shapeTypeSelect = document.getElementById('shapeType');
    const projectType = this.value;

    // Clear existing options
    shapeTypeSelect.innerHTML = '';

    // Add shape type options based on project type
    switch (projectType) {
        case 'BDM':
            shapeTypeSelect.innerHTML = '<option value="rectangle">Rectangle</option>';
            break;
        case 'BR':
            shapeTypeSelect.innerHTML = '<option value="rectangle">Rectangle</option>' + '<option value="rectangle_oval">Rectangle with oval</option>';
            break;
        case 'CL':
            shapeTypeSelect.innerHTML = '<option value="rectangle">Rectangle</option>' + '<option value="rectangle_oval">Rectangle with oval</option>' + '<option value="rectangle_rect">Rectangle with rectangle</option>';
            break;
        default:
            // Default options for other project types
            break;
    }})

// Get references to the elements
const photoOptionInput = document.getElementById('photoOption');
const uploadPhotoButton = document.getElementById('uploadPhoto');
const takePhotoButton = document.getElementById('takePhoto');

// Handle the "Upload Existing" button click
uploadPhotoButton.addEventListener('click', () => {
    // Trigger a click event on the hidden file input
    photoOptionInput.click();
});

// Handle the "Take New Photo" button click
takePhotoButton.addEventListener('click', () => {
    // Remove the 'capture' attribute to open the file dialog for selecting existing photos
    photoOptionInput.removeAttribute('capture');
    
    // Trigger a click event on the hidden file input
    photoOptionInput.click();
});

// Handle file input change (when a photo is selected)
photoOptionInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        // Handle the selected file here, e.g., display it or upload it to the server
        console.log(`Selected file: ${selectedFile.name}`);
    }
});