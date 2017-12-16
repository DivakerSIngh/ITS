

createChart();
function createChart() {
    debugger
    $("#chart").kendoChart({
        title: {
            text: "Site Visitors Stats /thousands/"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "column"
        },
        series: [{
            name: "Total Visits",
            data: [56000, 63000, 74000, 91000, 117000, 138000]
        }, {
            name: "Unique visitors",
            data: [52000, 34000, 23000, 48000, 67000, 83000]
        }],
        valueAxis: {
            line: {
                visible: false
            }
        },
        categoryAxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            format: "{0}"
        }
    });
}

$(document).ready(function () {
    debugger
    createChart();

    $("#example").bind("kendo:skinChange", createChart);

    var chart = $("#chart").data("kendoChart"),
        firstSeries = chart.options.series;

    $("#getGap").click(function () {
        firstSeries[0].gap = parseFloat($("#gap").val(), 10);
        chart.redraw();
    });

    $("#getSpacing").click(function () {
        firstSeries[0].spacing = parseFloat($("#spacing").val(), 10);
        chart.redraw();
    });

    if (kendo.ui.NumericTextBox) {
        $("#gap").kendoNumericTextBox();
        $("#spacing").kendoNumericTextBox();
    }
});