let employeeRatings = {}; // Object to store ratings for each employee

// Function to set the rating based on the star clicked
function setRating(starElement, category) {
    const rating = parseInt(starElement.getAttribute('data-rating'));
    const stars = starElement.parentNode.querySelectorAll('.star');
    const label = document.getElementById(`${category}-label`);

    stars.forEach((star, index) => {
        star.classList.toggle('selected', index < rating);
    });

    const labels = ["Poor", "Fair", "Average", "Good", "Excellent"];
    label.textContent = labels[rating - 1];

    // Store the rating for the selected employee
    const employeeName = document.getElementById('employee-name').innerText;
    if (!employeeRatings[employeeName]) {
        employeeRatings[employeeName] = {};
    }
    employeeRatings[employeeName][category] = rating;
}

// Function to reset the feedback form
function resetFeedbackForm() {
    document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
    document.querySelectorAll('span[id$="-label"]').forEach(label => label.textContent = '');
}

// Function to select an employee and show the feedback form
function selectEmployee(name) {
    document.getElementById('employee-name').innerText = name;
    document.getElementById('employee-list').style.display = 'none';
    document.getElementById('feedback-form').style.display = 'block';
}

// Function to go back to the employee list
function goBack() {
    document.getElementById('feedback-form').style.display = 'none';
    document.getElementById('employee-list').style.display = 'block';
}

// Show overall performance section
function showOverallPerformance() {
    document.getElementById('employee-list').style.display = 'none';
    document.getElementById('overall-performance').style.display = 'block';
    displayOverallPerformanceChart();
}

// Function to calculate overall ratings for each employee
function calculateOverallRatings() {
    const categories = ['productivity', 'quality', 'goal', 'time', 'collaboration', 'adaptability', 'innovation'];
    let averages = {};

    // Initialize averages for each employee
    for (const employee in employeeRatings) {
        averages[employee] = 0;
        let count = 0;

        categories.forEach(category => {
            const rating = employeeRatings[employee][category];
            if (rating) {
                averages[employee] += rating;
                count++;
            }
        });

        // Calculate average for the employee
        averages[employee] = count > 0 ? (averages[employee] / count) : 0;
    }

    return averages;
}

// Function to display overall performance chart with transparent colors for multiple employees
function displayOverallPerformanceChart() {
    const averages = calculateOverallRatings();
    const ctx = document.getElementById('overall-performance-chart').getContext('2d');

    const labels = Object.keys(averages);
    const data = Object.values(averages);
    
    // Define transparent colors for each employee
    const colors = data.map(value => {
        if (value >= 4) return 'rgba(76, 175, 80, 0.5)'; // Transparent Green for excellent
        if (value >= 3) return 'rgba(255, 193, 7, 0.5)';  // Transparent Yellow for average
        return 'rgba(244, 67, 54, 0.5)';  // Transparent Red for poor
    });

    // Create or update the chart
    if (window.performanceChart) {
        // If the chart already exists, update it
        window.performanceChart.data.labels = labels;
        window.performanceChart.data.datasets[0].data = data;
        window.performanceChart.data.datasets[0].backgroundColor = colors;
        window.performanceChart.update();
    } else {
        // If the chart doesn't exist, create it
        window.performanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Ratings',
                    data: data,
                    backgroundColor: colors
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5 // Assuming a max rating of 5
                    }
                }
            }
        });
    }
}

// Function to submit feedback
function submitFeedback() {
    if (allRatingsProvided()) {
        alert("Feedback Submitted!");
        resetFeedbackForm();
        goBack();
    } else {
        alert("Please provide a rating for all categories before submitting.");
    }
}

// Function to check if all ratings are provided
function allRatingsProvided() {
    const categories = ['productivity', 'quality', 'goal', 'time', 'collaboration', 'adaptability', 'innovation'];
    return categories.every(category => document.querySelector(`#${category}-stars .star.selected`) !== null);
}

// Function to go back to the employee list from overall performance
function goBackToEmployeeList() {
    document.getElementById('overall-performance').style.display = 'none';
    document.getElementById('employee-list').style.display = 'block';
}
