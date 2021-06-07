document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.text')

function addText(range) {
    let proc = 0;
    switch(range) {
        case 'week':  
            proc = 2;
            break;
        case 'month': 
            proc = 4;
            break;

        case '3month':  
            proc = 6;
            break;
        case '6month':  
            proc = 6;
            break;
        case 'year':  
            proc = 6;
            break;
        case 'ytd':  
            proc = 6;
            break;
        case '2year':  
            proc = 6;
            break;
        default:
            proc = 100; 
            break;
    }

    text.innerHTML = proc;
}

Highcharts.getJSON('test.json', function (data) {
    // Create the chart
    const _data = data.map((elem) => {
        return [
            elem[0]*1000,
            parseFloat(elem[1])
        ]
    })
    Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 3,
            inputEnabled: false,
            labelStyle: {
                display: 'none',
            },
            buttonTheme: {
                width: '100px',
                fill: 'none',
            },
            buttons: [{
                type: 'week',
                count: 1,
                text: '5 дней',
                title: '5 дней',
                dataGrouping: {
                    forced: true,
                    units: [['day', [1]]]
                },
                events:{
                    click: (e) =>  {
                        addText('week')
                        console.log(e)
                }     
                    
                }
            }, {
                type: 'month',
                count: 1,
                text: '1 мес',
                title: '1 месяц',
                events:{
                    click: () => addText('month')
                }
            }, {
                type: 'month',
                count: 3,
                text: '3 мес',
                title: 'View 3 months',
                events:{
                    click:  () => addText('3month')
                }
            }, {
                type: 'month',
                count: 6,
                text: '6 мес',
                title: 'View 6 months',
                events:{
                    click: () => addText('6month')
                }
            }, {
                type: 'year',
                count: 1,
                text: '1 год',
                title: 'View 1 year',
                events:{
                    click: () => addText('year')
                }
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'С начала года',
                events:{
                    click: () => addText('ytd')
                }
            },{
                type: 'year',
                count: 2,
                text: '2 года',
                title: 'View 1 year',
                events:{
                    click: () => addText('2year')
                }
            },{
                type: 'year',
                count: 5,
                text: '5 лет',
                title: 'View 1 year',
                events:{
                    click: () => addText('5year')
                }
            }, {
                type: 'all',
                text: 'All',
                title: 'View all',
                events:{
                    click: () => addText('all')
                }
            }]
        },

        title: {
            text: ''
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
            name: 'Название графика',
            data: _data,
            tooltip: {
                valueDecimals: 2
            },
        }],

        legend: {
            enabled: true,
        },

            colors: ['#5ecba1', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
            '#FF9655', '#FFF263', '#6AF9C4'],

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

        }, { // right y axis
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
    });
});

})

// Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-c.json', function (data) {
//     // Create the chart
//     Highcharts.Chart('container', {


//         rangeSelector: {
//             selected: 1
//         },

//         title: {
//             text: 'Text'
//         },

//         series: [{
//             name: 'AAPL',
//             data: data,
//             tooltip: {
//                 valueDecimals: 2
//             }
//         }]
//     });
// });

// Highcharts.theme = {
//     colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
//             '#FF9655', '#FFF263', '#6AF9C4'],
//     chart: {
//         backgroundColor: {
//             linearGradient: [0, 0, 500, 500],
//             stops: [
//                 [0, 'rgb(255, 255, 255)'],
//                 [1, 'rgb(240, 240, 255)']
//             ]
//         },
//     },
//     title: {
//         style: {
//             color: '#000',
//             font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
//         }
//     },
//     subtitle: {
//         style: {
//             color: '#666666',
//             font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
//         }
//     },
//     legend: {
//         itemStyle: {
//             font: '9pt Trebuchet MS, Verdana, sans-serif',
//             color: 'black'
//         },
//         itemHoverStyle:{
//             color: 'gray'
//         }
//     },
//     navigator: {
//         enabled:false,
//     }

    
// };