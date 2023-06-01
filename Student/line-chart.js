

function createLineChart(studentNames, marksData) {
    const chartCanvas = document.getElementById('chart').getContext('2d');

    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: studentNames,
            datasets: [{
                label: 'Marks',
                data: marksData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Student Name'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Marks'
                    },
                    beginAtZero: true,
                    max: 50
                }
            }
        }
    });
}