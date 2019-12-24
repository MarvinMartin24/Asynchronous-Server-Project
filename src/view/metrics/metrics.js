let token;
var myLineChart;
var chart;
var new_url_update = '/api/profile/metric/update'
var new_url_delete = '/api/profile/metric/delete'



const getToken = () => {
    token = localStorage.getItem('token')
    $.ajaxSetup({
        headers: {
          'token': token
        }
      });
};

const addMetrics = () => {
    $('.addData').click(function(){
        $.post("/api/profile/add-metric").done((res) => {
            window.location.reload()
        })
    });
};

const removeMetrics = () => {
    console.log(new_url_delete)
    $('.removeData').click(function(){
        $.ajax({
            url: new_url_delete,
            type: 'DELETE',
            success: function(result) {
                console.log(result)
                window.location.reload()
            }
        });
    });
};

const updateMetrics = () => {
    console.log(new_url_update)
    $('.updateData').click(function(){
        $.ajax({
            url: new_url_update,
            type: 'PUT',
            success: function(result) {
                window.location.reload()
            }
        });
    });
};

const getPoint = () => {
    document.getElementById("Chart").onclick = function(evt){
        var firstPoint = myLineChart.getElementAtEvent(evt)[0];
        if (firstPoint) {
            var selectedPoint = myLineChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
            console.log(selectedPoint)
            new_url_update = new_url_update + '/'+ selectedPoint._id;
            new_url_delete = new_url_delete+ '/'+ selectedPoint._id;
            $('#metricId').text("\nDate = " + selectedPoint.x + " Value= " + selectedPoint.y);
        }
    };
};

const getMetrics = () => {
    $.getJSON("/api/profile/metrics").done((res) => {
        if (res.status === 'success') {
            plotMetrics(res.data.metrics);
        }
        else {
            alert(JSON.stringify(res.result));
        }
    })
};

const plotMetrics = (metrics) => {
    chart = document.getElementById('Chart');
    myLineChart = new Chart(chart, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Value / Date',
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    data: metrics.map((metric) => {
                        return {
                            _id: metric._id,
                            x: metric.date,
                            y: metric.value,
                        };
                    })
                }
            ]
        },
        options: {
            responsive: true,
			title: {
				display: true,
				text: 'Your Metrics'
			},
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 1.5
                }
            },
            scales: {
                xAxes: [{
                    type: 'time'
                }],
                yAxes: [{
                    type: 'linear'
                }]
            },
            tooltips: {
					mode: 'index',
					intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			}
        }
    });
};
