function getCalender(data) {
    const parse_data = JSON.parse(data);
    let eventObj = [];
    for (const key in parse_data) {
        if (parse_data.hasOwnProperty(key)) {
            var Date = parse_data[key].Start_Date;
            var year = Date.substring(6, 10);
            var month = Date.substring(3, 5);
            var day = Date.substring(0, 2);
            var setDate = year + "-" + month + "-" + day;

            eventObj[key] = {
                title: parse_data[key].Subject,
                start: setDate,
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2020-11-07',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: eventObj,
        });
        calendar.render();
    });
}
