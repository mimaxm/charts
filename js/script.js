document.addEventListener('DOMContentLoaded', () => {
    let text = document.querySelector('.text')
    function addText(range, e) {
    let summ = 0
    
    range.map(el => {
        summ += el
    })
    
    text.innerHTML = `Средняя доходность за период: ${(summ/range.length).toFixed(2)}%`;
}

console.log()

const name = 'Доходность'
moment.locale('ru')
Highcharts.getJSON('test.json', function (data) {

    // Create the chart
    const chart = Highcharts.stockChart('container', {
        rangeSelector: {
            selected: 8,
            inputEnabled: false,
            labelStyle: {
                display: 'none',
            },
            buttonTheme: {
                width: '100px',
                fill: 'none',
            },
            buttons: [{
                type: 'day',
                count: 5,
                text: '5 дней',
                title: '5 дней',
                dataGrouping: {
                    forced: true,
                    units: [['day', [1]]]
                },

            }, {
                type: 'month',
                count: 1,
                text: '1 мес',
                title: '1 месяц',
            }, {
                type: 'month',
                count: 3,
                text: '3 мес',
                title: '3 месяца',

            }, {
                type: 'month',
                count: 6,
                text: '6 мес',
                title: '6 месяцев',
            }, {
                type: 'year',
                count: 1,
                text: '1 год',
                title: '1 год',
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'С начала года',
            },{
                type: 'year',
                count: 2,
                text: '2 года',
                title: '2 года',
            },{
                type: 'year',
                count: 5,
                text: '5 лет',
                title: '5 лет',
            }, {
                type: 'all',
                text: 'Весь период',
                title: 'За всё время',
            }]
        },

        title: {
            text: ''
        },

        chart: {
            events: {
                redraw: () => addText(chart.series[0].processedYData)
            }
        },

        scrollbar: {
            enabled: false,
        },

        navigator: {
            enabled: false,
        },

        exporting: {
            buttons: {
                contextButton: {
                    enabled: false,
                },
            },
        },

        series: [{
            name: name,
            data: data,
            tooltip: {
                valueDecimals: 2
            },
        }],

        legend: {
            enabled: true,
        },

        colors: ['#5ecba1', '#50B432', '#ED561B'],

        xAxis: {
            type: "datetime",
            crosshair: {
                color: "#EBE9EA"
            },
            gridLineWidth: 1,
            gridLineColor: "#EBE9EA",
            labels: {
                style: {
                    color: "#9598A7"
                },
                format: "{value:%d.%m.%Y}"
            },
            lineColor: "#EBE9EA",
            tickLength: 0,
            tickWidth: 0
        },

        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '100%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],

        tooltip: {
            formatter: function() {
                return `${moment(new Date(this.x)).format('dd, D MMMM YYYY')} <br><span style='color:#5ecba1;'>&#9679;</span> ${name}: <b> ${this.y.toFixed(2)}% </b>` ;
            }
        }
    });
    
    addText(chart.series[0].processedYData)
    
});

})