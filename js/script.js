document.addEventListener('DOMContentLoaded', () => {

    function addText(chart, element) {        
        let wrap = element.parentElement;
        let chartSeriesProcessData = chart.series[0].processedYData;
        let selectedAll = chart.rangeSelector.selected;
        let profitValue = wrap.querySelector('.strategy-profit__value');
        let profitText = wrap.querySelector('.strategy-profit__text');
        let profit;
    
        if (selectedAll === 8) {
            profit = chartSeriesProcessData[(chartSeriesProcessData.length - 1)] - chartSeriesProcessData[0];
            console.log(true);
        } else {
            profit = chartSeriesProcessData[(chartSeriesProcessData.length - 1)] - chartSeriesProcessData[1];
            console.log(false);
        };
        
        profitValue.innerHTML = `${(profit).toFixed(2)}%`;
        profitText.innerHTML = `<div>Доходность за выбранный период </br> ${element.dataset.currency}, с учётом издержек</div>`;
    }

    const name = 'Доходность с учётом издержек *';
    const idAll = document.querySelectorAll('.chart-container');
    
    idAll.forEach(chartId => {
        Highcharts.getJSON(chartId.dataset.url, function (data) {

        // Create the chart
            Highcharts.setOptions({
                lang: {
                    rangeSelectorZoom: '',
                },
            });
            
            let chart = Highcharts.stockChart(chartId.id, {
                chart: {
                    styledMode: true,
                },
                rangeSelector: {
                    selected: 8,
                    inputEnabled: false,
                    labelStyle: {
                        display: 'none',
                    },
                    buttonTheme: {
                        width: '100%',
                        fill: 'none',
                        style: {
                            color: '#9598a7',
                            fontWeight: '700',
                        },
                        states: {
                            hover: {
                                color: '#333',
                            },
                            select: {
                                    color: '#333',
                            }
                        }
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
                        redraw: () => addText(chart, chartId),
                    },
                    tooltip: {
                        crosshairs: true,
                        followPointer: true,
                        followTouchMove: true
                    },
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
                    type: 'line',
                    name: name,
                    data: data,
                }],
        
                legend: {
                    enabled: true,
                    align: 'left',
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
                    split: false,
                    formatter: function () {
                        let d = new Date(this.x).customFormat( "#ddd#, #D# #MMMM# #YYYY#" );
                        return  d  + '<br /><span style="color:#5ecba1;">&#9679;</span> ' + name + ':<b> ' + this.y.toFixed(2) + '%</b>';
                    },
                }
            });
        
            Date.prototype.customFormat = function(formatString){
                var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,ddd,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
                YY = ((YYYY=this.getFullYear())+"").slice(-2);
                MM = (M=this.getMonth()+1)<10?('0'+M):M;
                MMM = (MMMM=["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"][M-1]).substring(0,3);
                DD = (D=this.getDate())<10?('0'+D):D;
                DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
                ddd = (DDDD=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"][this.getDay()]).substring(0,2);
                th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
                formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#ddd#",ddd).replace("#th#",th);
                h=(hhh=this.getHours());
                if (h==0) h=24;
                if (h>12) h-=12;
                hh = h<10?('0'+h):h;
                hhhh = hhh<10?('0'+hhh):hhh;
                AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
                mm=(m=this.getMinutes())<10?('0'+m):m;
                ss=(s=this.getSeconds())<10?('0'+s):s;
                return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
            };

            addText(chart, chartId)
        });
    });
});