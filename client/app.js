function onPageLoad() {
    console.log("Document loaded");
    var url = "http://127.0.0.1:5000/get_location_names"; // API URL for fetching locations

    $.get(url, function (data, status) {
        console.log("Got response from get_location_names", data);

        // Check for the correct key in the response
        if (data && data.location) { // Change this line
            var locations = data.location; // Fetch locations from the response
            var uiLocation = document.getElementById("uiLocation");
            $('#uiLocation').empty(); // Clear the dropdown
            $('#uiLocation').append(new Option("Select Location", "", true, true)); // Add default option

            // Append each location to the dropdown
            locations.forEach(function (location) {
                $('#uiLocation').append(new Option(location, location));
            });
        } else {
            console.error("Invalid response format or no locations found.");
        }
    }).fail(function() {
        console.error("Failed to fetch location data");
    });
}

// Trigger the function when the page loads
window.onload = onPageLoad;



document.addEventListener('DOMContentLoaded', function () {
    let selectedBhk = 1;
    let selectedBathroom = 1;

    // BHK Button click handler
    const bhkButtons = document.querySelectorAll('#bhk-group .option-button');
    bhkButtons.forEach(button => {
        button.addEventListener('click', function () {
            bhkButtons.forEach(btn => btn.classList.remove('active')); // Remove 'active' from all buttons
            this.classList.add('active'); // Add 'active' to the clicked button
            selectedBhk = this.getAttribute('data-value'); // Get the selected BHK value
        });
    });

    // Bathroom Button click handler
    const bathroomButtons = document.querySelectorAll('#bathroom-group .option-button');
    bathroomButtons.forEach(button => {
        button.addEventListener('click', function () {
            bathroomButtons.forEach(btn => btn.classList.remove('active')); // Remove 'active' from all buttons
            this.classList.add('active'); // Add 'active' to the clicked button
            selectedBathroom = this.getAttribute('data-value'); // Get the selected Bathroom value
        });
    });

    // Function to handle Estimate Price calculation
    function onClickedEstimatePrice() {
        const squareFeet = document.getElementById('squareFeet').value; // Get value from the input box
        const location = document.getElementById('uiLocation').value; // Get selected location

        // Log the values to the console
        console.log("Square Feet:", squareFeet);
        console.log("Selected BHK:", selectedBhk);
        console.log("Selected Bathroom:", selectedBathroom);
        console.log("Location:", location);

        // Mock calculation logic
        var url = "http://127.0.0.1:5000/predict_home_price"

        $.post(url, {
            total_sqft: parseFloat(squareFeet),  // Change to squareFeet directly
            bhk: selectedBhk,
            bath: selectedBathroom,
            location: location,  // Change to location directly
        }, function(data, status) {
            console.log("Estimated Price:", data.estimated_price); // Log the estimated price
            // Display the result...
            const outputBox = document.getElementById('output'); // Ensure the output box exists
            const priceSpan = document.getElementById('price'); // Ensure the price span exists

            if (outputBox && priceSpan) { // Check if elements exist
                priceSpan.textContent = `₹ ${data.estimated_price.toLocaleString()} Lakhs`; // Use the estimated price from the response
                outputBox.style.display = 'block';
            } else {
                console.error("Output box or price span not found!");
            }
        });
        
    }

    // Estimate Button click event
    document.getElementById('estimateBtn').addEventListener('click', onClickedEstimatePrice);

});
