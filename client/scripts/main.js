$(document).ready(function () {
    $('.datepicker').datetimepicker({
        autoclose: true,
        todayBtn: true
    });

    $('#refresh').click(function () {
        var dateFrom = $('#dateFrom').datetimepicker('getUTCDate').getTime();
        var dateTo = $('#dateTo').datetimepicker('getUTCDate').getTime();
        var url = '/api/conso/' + dateFrom + '/' + dateTo;
        $.ajax({
            url: url,
            success: function (data) {
                display(data)
            },
            error: function (err) {
                alert('erreur ' + JSON.stringify(err, null, 4))
            }
        });
    });

    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    fetchDay();
    function fetchDay() {
        var dayStart = moment().startOf('day');
        var dayEnd = moment().endOf('day');
        var dayUrl = '/api/conso/' + dayStart.valueOf() + '/' + dayEnd.valueOf();
        $.get(dayUrl, function (dayData) {
            display(dayData)
        })
    }
    function display(data){
        $('#chart').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            scrollbar: {
                enabled: true
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                }
            },
            yAxis: {
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    name: 'LED',
                    data: formatData(data)
                }
            ]
        });

    }

    function formatData(datas) {
        var oldState = null;
        var buffer = [];
        var valueOn = 1;
        var valueOff = 0;
        datas.reverse()
        _.each(datas, function (data) {
            if ('null' != oldState)
                buffer.push([moment(data.date).subtract(1, 'seconds').valueOf(), oldState ? valueOn : valueOff])
            buffer.push([moment(data.date).add(0, 'seconds').valueOf(), data.state ? valueOn : valueOff])
            oldState = data.state
        });
        return buffer
    }
});