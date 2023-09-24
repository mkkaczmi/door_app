// Function to show a confirmation message when the user tries to leave the page
function confirmLeavePage(e) {
    // Display a confirmation message
    const confirmationMessage = 'WARNING! All unsaved data will be lost!';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
}

// Attach the confirmLeavePage function to the beforeunload event
window.addEventListener('beforeunload', confirmLeavePage);

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

// Function to dynamically update subtype options based on project type selection
document.getElementById('projectType').addEventListener('change', function () {
    const projectSubtypeSelect = document.getElementById('projectSubtype');
    const projectType = this.value;

    // Clear existing options
    projectSubtypeSelect.innerHTML = '';

    switch (projectType) {
        case 'BD-M': case 'BD-M/R': case 'BD-R':
            projectSubtypeSelect.innerHTML = '<option value="" selected disabled hidden>choose project subtype</option>'
                                            + '<option value="CUS">CUS - Custom type</option>'
                                            + '<option value="IO1">IO1 - Inside opening 1D</option>'
                                            + '<option value="IO2">IO2 - Inside opening 2D</option>'
                                            + '<option value="OC1">OC1 - Outside casing 1D</option>'
                                            + '<option value="OC2">OC2 - Outside casing 2D</option>';
            break;
        case "CL": case "FCH": case "SWG": case "SWG-2STD": case "TLSC-BFLD": case "TLSCP":
            projectSubtypeSelect.innerHTML = '<option value="" selected disabled hidden>choose project subtype</option>'
                                            + '<option value="CUS">CUS - Custom type'
                                            + '<option value="M1">M1 - 1 module</option>'
                                            + '<option value="M2">M2 - 2 modules</option>'
                                            + '<option value="M3">M3 - 3 modules</option>'
                                            + '<option value="M4">M4 - 4 modules</option>'
                                            + '<option value="M5">M5 - 5 modules</option>'
                                            + '<option value="M6">M6 - 6 modules</option>'
                                            + '<option value="M7">M7 - 7 modules</option>';
            break;
        default:
            projectSubtypeSelect.innerHTML = '<option value="noneSubtype">none</option>';
            break;
    }})

// Function to dynamically update handle options based on project type selection
document.getElementById('projectType').addEventListener('change', function () {
    const handleTypeSelect = document.getElementById('handleType');
    const projectType = this.value;

    // Clear existing options
    handleTypeSelect.innerHTML = '';

    switch (projectType) {
        case 'FCH': case 'SWG':
            handleTypeSelect.innerHTML = '<option value="" selected disabled hidden>choose handle type</option>'
                                            + '<option value="L">L - latch</option>'
                                            + '<option value="B">B - b-2-b</option>'
                                            + '<option value="G12">G12 - glass 12"</option>'
                                            + '<option value="G24">G24 - glass 24"</option>'
                                            + '<option value="G48">G48 - glass 48"</option>'
                                            + '<option value="CUS">CUS - custom</option>'
                                            + '<option value="NO">NO - none</option>';
            break;
        default:
            handleTypeSelect.innerHTML = '<option value="defaultHandle">default</option>';
            break;
    }})

// Function to dynamically update material options based on project type selection
document.getElementById('projectType').addEventListener('change', function () {
    const materialSelect = document.getElementById('panelMaterial');
    const projectType = this.value;

    // Clear existing options
    materialSelect.innerHTML = '';

    switch (projectType) {
        case 'BD-M': case 'BD-M/R': case 'BD-R': case 'CL': case 'FCH':
        case 'FRL': case 'MIX': case 'PIV': case 'SWG': case 'TLSC-BFLD':
        case 'TLSCP': case 'TTBD': case 'WINDOW': case 'WOOD': case 'XO':
        case 'XOOX': case 'XOX':
        materialSelect.innerHTML = '<option value="" selected disabled hidden>choose material</option>'
                                            + '<option value="C">C - Clear</option>'
                                            + '<option value="M">M - Milky</option>'
                                            + '<option value="B">B - Black</option>'
                                            + '<option value="Ls">Ls - Mirror 1/4"</option>'
                                            + '<option value="Mmm">Mmm - MIX-Mirror/Milky</option>'
                                            + '<option value="Lb">Lb- Mirror 3/16</option>'
                                            + '<option value="LAM">LAM - Laminate</option>'
                                            + '<option value="CUS">CUS - Custom</option>'
                                            + '<option value="SG">SG - Satin Gl. 1/4"</option>'
                                            + '<option value="TIN">TIN - Tinted</option>'
                                            + '<option value="spClVi">spClVi - Clear Laminate (Vinyl/PCV)</option>';
            break;
        default:
            materialSelect.innerHTML = '<option value="noneMaterialFirst">none</option>';
            break;
    }})

// Function to dynamically update second side material options based on project type selection
document.getElementById('projectType').addEventListener('change', function () {
    const materialSelect = document.getElementById('panelMaterialSecond');
    const projectType = this.value;

    // Clear existing options
    materialSelect.innerHTML = '';

    switch (projectType) {
        case 'BD-M': case 'BD-M/R': case 'BD-R': case 'CL': case 'FCH':
        case 'FRL': case 'MIX': case 'PIV': case 'SWG': case 'TLSC-BFLD':
        case 'TLSCP': case 'TTBD': case 'WINDOW': case 'WOOD': case 'XO':
        case 'XOOX': case 'XOX':
        materialSelect.innerHTML = '<option value="" selected disabled hidden>choose material</option>'
                                            + '<option value="same">Same as first side</option>'
                                            + '<option value="C">C - Clear</option>'
                                            + '<option value="M">M - Milky</option>'
                                            + '<option value="B">B - Black</option>'
                                            + '<option value="Ls">Ls - Mirror 1/4"</option>'
                                            + '<option value="Mmm">Mmm - MIX-Mirror/Milky</option>'
                                            + '<option value="Lb">Lb- Mirror 3/16</option>'
                                            + '<option value="LAM">LAM - Laminate</option>'
                                            + '<option value="CUS">CUS - Custom</option>'
                                            + '<option value="SG">SG - Satin Gl. 1/4"</option>'
                                            + '<option value="TIN">TIN - Tinted</option>'
                                            + '<option value="spClVi">spClVi - Clear Laminate (Vinyl/PCV)</option>';
            break;
        default:
            materialSelect.innerHTML = '<option value="noneMaterialSecond">none</option>';
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


// Initialize data objects for each form
let formData1 = {};
let formData2 = {};
let formData3 = {};
let formData4 = {};

// Function to serialize form data to CSV
function serializeToCSV(data) {
    return Object.keys(data)
        .map(key => `${key},${data[key]}`)
        .join('\n');
}

// Function to parse CSV data into an object
function parseCSVToObject(csvData) {
    const lines = csvData.trim().split('\n');
    const data = {};
    lines.forEach(line => {
        const [key, value] = line.split(',');
        data[key] = value;
    });
    return data;
}

// Function to save data as a CSV file
function saveDataToCSV(data, fileName) {
    const csvContent = serializeToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to populate form fields from an object
function populateFormFromObject(form, data) {
    Object.keys(data).forEach(key => {
        const element = form.querySelector(`#${key}`);
        if (element) {
            element.value = data[key];
        }
    });
}

// Save Data button click event
document.getElementById('saveData').addEventListener('click', function () {
    // Serialize form data and save as CSV

    // FIRST FORM, FIRST COLUMN
    formData1.clientName = document.getElementById('clientName').value;
    formData1.clientEmail = document.getElementById('clientEmail').value;
    formData1.clientPhone = document.getElementById('clientPhone').value;
    formData1.street = document.getElementById('street').value;
    formData1.city = document.getElementById('city').value;
    formData1.state = document.getElementById('state').value;
    formData1.postalCode = document.getElementById('postalCode').value;
    formData1.country = document.getElementById('country').value;

    // FIRST FORM, SECOND COLUMN
    formData1.TASD_rep = document.getElementById('TASD_rep').value;
    formData1.projectCode = document.getElementById('projectCode').value;
    formData1.projectType = document.getElementById('projectType').value;
    
    var select = document.getElementById('projectSubtype');
    formData1.projectSubtype = select.options[select.selectedIndex].value;

    formData1.shapeType = document.querySelector('input[name="shapeType"]:checked').value;
    formData1.expectedInstallation = document.querySelector('input[name="expectedInstallation"]:checked').value;
    formData1.installationDate = document.getElementById('installationDate').value;


    // SECOND FORM, FIRST COLUMN
    var select = document.getElementById('handleType');
    formData2.handleType = select.options[select.selectedIndex].value;
    var select = document.getElementById('color');
    formData2.color = select.options[select.selectedIndex].value;
    var select = document.getElementById('panelMaterial');
    formData2.panelMaterial = select.options[select.selectedIndex].value;
    var select = document.getElementById('panelMaterialSecond');
    formData2.panelMaterialSecond = select.options[select.selectedIndex].value;
    var select = document.getElementById('decors');
    formData2.decors = select.options[select.selectedIndex].value;
    var select = document.getElementById('transome');
    formData2.transome = select.options[select.selectedIndex].value;

    // SECOND FORM, SECOND COLUMN
    formData2.commercial = document.querySelector('input[name="commercial"]:checked').value;
    formData2.constructionWorks = document.querySelector('input[name="constructionWorks"]:checked').value;

    formData2.constructionWorksComments = document.getElementById('constructionWorksComments').value;


    // THIRD FORM
    formData3.prePaidAmount = document.getElementById('prePaidAmount').value;
    formData3.priceTag = document.getElementById('priceTag').value;

    // COMMENTS
    formData4.installComments = document.getElementById('installComments').value;

    fileName = document.getElementById('projectCode').value;

    // Save each form's data as a separate CSV file
    saveDataToCSV(formData1, fileName + '_1stForm.csv');
    setTimeout(() => {
        saveDataToCSV(formData2, fileName + '_2ndForm.csv');
    }, 2000); // Delayed by 2 second (adjust as needed)
    setTimeout(() => {
        saveDataToCSV(formData3, fileName + '_3rdForm.csv');
    }, 4000); // Delayed by 4 seconds (adjust as needed)
    setTimeout(() => {
        saveDataToCSV(formData4, fileName + '_comments.csv');
    }, 6000); // Delayed by 6 seconds (adjust as needed)
});

// Import Data input change event
document.getElementById('importData').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            const parsedData = parseCSVToObject(csvData);

            // Populate the first form's fields using parsedData
            populateFormFromObject(document.getElementById('form1'), parsedData);
            populateFormFromObject(document.getElementById('form2'), parsedData);
            populateFormFromObject(document.getElementById('form3'), parsedData);
            populateFormFromObject(document.getElementById('form4'), parsedData);
            
            // Handle radio buttons separately
            const shapeType = parsedData.shapeType;
            const expectedInstallation = parsedData.expectedInstallation;
            const commercial = parsedData.commercial;
            const constructionWorks = parsedData.constructionWorks;

            if (shapeType) {
                const shapeOptions = document.querySelectorAll('input[name="shapeType"]');
                shapeOptions.forEach(option => {
                    if (option.value === shapeType) {
                        option.checked = true;
                    }
                });
            }

            if (expectedInstallation) {
                const expectedInstallationOptions = document.querySelectorAll('input[name="expectedInstallation"]');
                expectedInstallationOptions.forEach(option => {
                    if (option.value === expectedInstallation) {
                        option.checked = true;
                    }
                });
            }

            if (commercial) {
                const commercialOptions = document.querySelectorAll('input[name="commercial"]');
                commercialOptions.forEach(option => {
                    if (option.value === commercial) {
                        option.checked = true;
                    }
                });
            }

            if (constructionWorks) {
                const constructionWorksOptions = document.querySelectorAll('input[name="constructionWorks"]');
                constructionWorksOptions.forEach(option => {
                    if (option.value === constructionWorks) {
                        option.checked = true;
                    }
                });
            }
        };
        reader.readAsText(file);
    }
});