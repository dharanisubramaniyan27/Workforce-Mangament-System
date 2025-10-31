// Data for Task Completion Rate
const taskCompletionCtx = document.getElementById('taskCompletionChart').getContext('2d');
const taskCompletionChart = new Chart(taskCompletionCtx, {
    type: 'bar',
    data: {
        labels: ['Worker A', 'Worker B', 'Worker C'],
        datasets: [{
            label: 'Task Completion Rate (%)',
            data: [85, 75, 90],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Data for Attendance Rate
const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
const attendanceChart = new Chart(attendanceCtx, {
    type: 'pie',
    data: {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [{
            label: 'Attendance Rate (%)',
            data: [80, 10, 10],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
});

// Data for Efficiency Score
const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
const efficiencyChart = new Chart(efficiencyCtx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Efficiency Score (%)',
            data: [70, 80, 85, 90],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
