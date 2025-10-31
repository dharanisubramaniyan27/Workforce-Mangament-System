document.getElementById('checkInBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(checkInEmployee, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function checkInEmployee(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Mock geofencing coordinates (e.g., office location)
    const officeLatitude = 13.1069;  // Example: Latitude of the office location
    const officeLongitude = 80.1272; // Example: Longitude of the office location
    const maxDistance = 1000000; // Distance in meters for geofencing (1 km radius)

    // Calculate the distance between the employee's location and the office
    const distance = calculateDistance(latitude, longitude, officeLatitude, officeLongitude);

    if (distance <= maxDistance) {
        // Simulate check-in success
        setTimeout(() => {
            alert('Check-in successful! You are located at: ' + latitude + ', ' + longitude);
        }, 1000); // Simulate a delay for the check-in process
    } else {
        alert('You are not within the check-in location. Please move closer to the designated area.');
    }
}

// Function to calculate the distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

// Handle errors in geolocation
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}

// For the video feed (camera access)
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    }).catch(function(error) {
        console.error('Camera access denied:', error);
        alert('Unable to access the camera. Please allow camera access.');
    });
}