const plotPositivityChart = (data) => {
    
    const dates = [];
	const positivity = [];
	const positive = [];
	const negative = [];
  
    for (const record of data.data) {
		const date = new Date(record.diagnosed_date);
		dates.push(date.getMonth() + 1 + "/" + date.getDate());
		positivity.push(record.positive_rate);
		positive.push(record.positive_count);
		negative.push(record.negative_count);
	}
	
	console.log(positive);
  
    var ctx = document.getElementById("positivityChart").getContext("2d");
  
    // line chart of cases over time of ward that cursor hovers over on the map.
    var overallChart = new Chart(ctx, {
		type: "bar",
		data: {
			// slice is used to include data from the last 60 days only.
			labels: dates.slice(dates.length - 60),
			datasets: [
				{
					label: lang.positivityLabel,
					data: positivity.slice(positivity.length - 60),
					borderColor: "rgba(255, 7, 57, 0.8)",
					fill: false,
					type: "line",
					yAxisID: 'percentage'
				},
				{
					label: lang.positivePeople,
					data: positive.slice(positive.length - 60),
					borderColor: "rgba(65, 105, 225, 1)",
					backgroundColor: "rgba(65, 105, 225, 1)",
					borderWidth: 1,
					fill: true,
					yAxisID: 'count'
				},
				{
					label: lang.negativePeople,
					data: negative.slice(negative.length - 60),
					borderColor: "rgba(135, 206, 235, 1)",
					backgroundColor: "rgba(135, 206, 235, 0.8)",
					borderWidth: 1,
					fill: true,
					yAxisID: 'count'
				}
            ],
		}, 
		options: {
			tooltips: {
				mode: "index",
				intersect: false,
				callbacks: {
					label: (tooltipItem, data) => {
						var label = data.datasets[tooltipItem.datasetIndex].label || '';
						if (label == lang.positivityLabel) {
							label += ": " + tooltipItem.yLabel + "%";
						} else {
							label += ": " + tooltipItem.yLabel;
						}
						
						return label;
					}
				}
			},
			hover: {
				mode: "index",
				intersect: false,
			},
			plugins: {
				datalabels: {
					font: {
						// disabling labels as chart becomes too cluttered.
						size: 0,
					},
				},
			},
			elements: {
				line: {
					tension: 0,
				},
				point: {
					radius: 0,
					backgroundColor: (context) => {
						return context.dataset.borderColor;
					},
				},
			},
			legend: {
				display: true,
			},
			maintainAspectRatio: false,
			scales: {
				yAxes: [
					{
						id: 'count',
						position: 'left',
						ticks: {
							suggestedMin: 0,
						},
						stacked: true
					},
					{
						id: 'percentage',
						position: 'right',
						ticks: {
							suggestedMin: 0,
							callback: function(value, index, values) {
								return value + '%'
							},
						},
						gridLines: {
							display: false
						},
					},
				],
				xAxes: [
					{
						gridLines: {
							display: false
						},
						stacked: true
					}
				]
			},
		}
    });
}
  
export default plotPositivityChart;