Chart = (function(attrs) {

var Charts = require('ti.charts');

var create = function(attrs) {
	
	var createAtts = merge({
		top:200,
		left:40,
		width:100,
		height:100,
		orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT],

		padding: {
			top:0,
			left:0,
			right:0,
			bottom:0
		},

		plotArea: {
			borderRadius: 0,
			borderColor: '#ffffff',
			borderWidth: 2.0,
			backgroundColor: "#ffffff",
			width:722,
			height:285
		},

		xAxis:
			{
				origin: 0,
				lineColor: 'black',
				lineWidth: 0.5,
				title: {
					offset: 10.0,
					color: '#023f66',
					font: { fontFamily:'Helvetica', fontSize:14 }
				},
				majorTickInterval: 10,
				majorTicks: {
					color: '#023f66',
					width: 0.5,
					length: 5.0
				},
				labels: {
					offset: 0.0,
					angle: 0.0,
					color: 'black',
					font: { fontFamily:'Helvetica', fontSize:8 }
				}
			},

		yAxis:
			{
				origin: 0,
				lineColor: 'black',
				lineWidth: 1.0,
				title: {
					offset: 20.0,
					color: '#023f66',
					font: { fontFamily:'Helvetica', fontSize:14 }
				},	
				majorTickInterval: 5,
			 	majorGridLines: {
					width: 1.0,
					color: '#999999',
					opacity: 0.8
				},
				labels: {
					offset: 0.0,
					angle: 45.0,
					color: 'black',
					font: { fontFamily:'Helvetica', fontSize:8 }
				}
			},

		plotSpace: {
			scaleToFit: true,
			expandRangeByFactor: 1.45
		}
	}, attrs);
	
	return Charts.createChart(createAtts);
}	

var addBars = function(chart, attrs) {
	return chart.createBarPlot(merge({
		lineColor: 'black',
		lineWidth: 0.4,
		fillGradient: {
			startColor: '#023f66',
			endColor: '#045f9a',
			angle: -45.0
		},
		fillOpacity: 1.0,
		barDirection: Charts.DIRECTION_VERTICAL,
		barWidth: 0.3,
		barOffset: 0.25,
		barCornerRadius: 2.0
	}, attrs));
}

return {create: create, addBars: addBars}

})();
