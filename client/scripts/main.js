$(document).ready(function () {
    $('.datepicker').datetimepicker({
        autoclose: true,
        todayBtn: true
    });

    $('#refresh').click(function () {
        var dateFrom = $('#dateFrom').datetimepicker('getUTCDate').getTime();
        var dateTo = $('#dateTo').datetimepicker('getUTCDate').getTime();
        var url = 'http://192.168.0.24:8000/api/conso/' + dateFrom + '/' + dateTo;
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
        var dayStart = moment().subtract(1, 'days');
        var dayEnd = moment();
        $('#dateFrom').datetimepicker('update', dayStart.format("YYYY-MM-DD HH:mm"));
        $('#dateTo').datetimepicker('update', dayEnd.format("YYYY-MM-DD HH:mm"));
        $('#refresh').click();
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
        datas = _.sortBy(datas, function(data){
            data.date
        });
        var buffer = [];
        var valueOn = 1;
        var valueOff = 0;
        datas.reverse();
        _.each(datas, function (data) {
            buffer.push([moment(data.date).valueOf(), data.state ? valueOn : valueOff])
        });
        return buffer
    }
});