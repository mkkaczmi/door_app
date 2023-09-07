// Add a click event listener to the "Get Current Location" button
document.getElementById('getLocation').addEventListener('click', getCurrentLocation);

// Function to handle geolocation
function getCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Reverse geocode the coordinates to get address details
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then((response) => response.json())
                .then((data) => {
                    // Separate address components
                    const addressComponents = data.address;

                    // Set values for separate text boxes
                    document.getElementById('street').value = addressComponents.road || '';
                    document.getElementById('city').value = addressComponents.city || addressComponents.town || '';
                    document.getElementById('state').value = addressComponents.state || '';
                    document.getElementById('postalCode').value = addressComponents.postcode || '';
                    document.getElementById('country').value = addressComponents.country || '';

                    // Set the full address in the "location" input
                    const fullAddress = data.display_name;
                    document.getElementById('location').value = fullAddress;
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
    // Clear individual address component input fields
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('postalCode').value = '';
    document.getElementById('country').value = '';
});

// Function to clear the form
function clearForm() {
    const doorForm = document.querySelector('.door-form');
    doorForm.reset(); // Reset the form
}

// Add a click event listener to the "Clear the form" button
document.getElementById('clearFirstForm').addEventListener('click', clearForm);

// Function to clear the second form
function clearSecondForm() {
    const doorFormSecond = document.querySelector('.door-form-second');
    doorFormSecond.reset(); // Reset the second form
}

// Add a click event listener to the "Clear the second form" button
document.getElementById('clearSecondForm').addEventListener('click', clearSecondForm);

/// Function to clear the third form
function clearThirdForm() {
    const priceForm = document.querySelector('.door-form-third');
    priceForm.reset(); // Reset the third form
}

// Add a click event listener to the "Clear the third form" button
document.getElementById('clearThirdForm').addEventListener('click', clearThirdForm);

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
const photoOptionInputs = document.querySelectorAll('input[type="file"]');
const imagePreviews = document.querySelectorAll('.image-preview');

// Function to handle file input change (when photos are selected)
function handleFileInput(event, previewContainer) {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
        // Clear the previous previews
        previewContainer.innerHTML = '';

        // Loop through selected files and create image previews
        for (const file of selectedFiles) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.classList.add('preview-image');
            image.addEventListener('click', () => {
                displayLargerImage(image.src);
            });

            previewContainer.appendChild(image);
        }
    }
}

// Add change event listeners to file inputs
photoOptionInputs.forEach((input, index) => {
    input.addEventListener('change', (event) => {
        handleFileInput(event, imagePreviews[index]);
    });
});

// Function to display a larger image when clicked
function displayLargerImage(imageSrc) {
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');

    const largerImage = document.createElement('img');
    largerImage.src = imageSrc;
    largerImage.classList.add('larger-image');

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeLargerImage(overlay);
    });

    overlay.appendChild(largerImage);
    overlay.appendChild(closeButton);

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
}

// Function to close the larger image
function closeLargerImage(overlay) {
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 200);
    }
}
