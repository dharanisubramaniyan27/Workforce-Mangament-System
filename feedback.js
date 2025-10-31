// Populate employee name from URL
document.getElementById('employeeName').textContent = new URLSearchParams(window.location.search).get('employee');

// Handle star rating logic
const stars = document.querySelectorAll('.star');
let ratings = {};

stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const category = this.parentNode.getAttribute('data-category');
        ratings[category] = value;

        // Highlight selected stars
        this.parentNode.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < value; i++) {
            this.parentNode.querySelectorAll('.star')[i].classList.add('selected');
        }

        console.log(`You rated ${value} for ${category}`);
    });
});

// Form submission
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Feedback Submitted:', ratings);

    // Save the feedback data into localStorage or use it to update the graph
    localStorage.setItem('feedback', JSON.stringify(ratings));
    alert('Feedback submitted successfully!');
});

// Go back function
function goBack() {
    window.history.back();
}
