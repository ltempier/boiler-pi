$(document).ready(function () {

    $('.datepicker').datetimepicker({
        autoclose: true,
        todayBtn: true
    });

    $('#refresh').click(function () {
        var dateFrom = $('#dateFrom').datetimepicker('getUTCDate').getTime();
        var dateTo = $('#dateTo').datetimepicker('getUTCDate').getTime();
        var url = '/api/conso/' + dateFrom + '/' + dateTo;
        $.get(url, function(){

        })
    });
});