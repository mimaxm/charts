document.addEventListener('DOMContentLoaded', () => {
    let text = document.querySelector('.text')
    function addText(range, e) {
    let summ = 0
    
    range.map(el => {
        summ += el
    })
    
    text.innerHTML = `Средняя доходность: ${(summ/range.length).toFixed(2)}%`;
}

const name = 'Доходность'
moment.locale('ru')
Highcharts.getJSON('test.json', function (data) {

    //переводим в милисекунды и строку координат в число
    const _data = data.map((elem) => {
        return [
            elem[0]*1000,
            parseFloat(elem[1])
        ]
    })

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
                events:{
                    click: (e) => addText(chart.series[0].processedYData, e)
                }
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
                events:{
                    click:  () => addText(chart.series[0].processedYData)
                }
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
            data: _data,
            tooltip: {
                valueDecimals: 2
            },
        }],

        legend: {
            enabled: true,
        },

        colors: ['#5ecba1', '#50B432', '#ED561B'],

        xAxis: {
            labels:{
                formatter: function(){
                    return moment(new Date(this.value)).format('DD.MM.YYYY'); // example for moment.js date library
                },
            },
            gridLineWidth: 1,
        },

        yAxis: [{
            labels: {
                enabled: false,
            },
            title: {
                enabled: false,
            },

        }, {
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title: {
                text: null
            },
            labels: {
                align: 'right',
                x: -3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }],

        tooltip: {
            formatter: function() {
                return `${name}: <b> ${this.y}% </b> <br> <b> ${moment(new Date(this.x)).format('DD MMMM YYYY')} </b>` ;
            }
        }
    });
    
    addText(chart.series[0].processedYData)
    
});

})