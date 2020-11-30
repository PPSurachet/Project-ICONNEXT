const getChart = (ObjectManpower, Holiday) => {
    const Manpower = JSON.parse(ObjectManpower);
    const getHoliday = JSON.parse(Holiday);
    const getDaysInMonth = getWeekdaysInmonth(new Date().getFullYear(), new Date().getMonth());
    for (const array in getDaysInMonth) {
        for (const days in getHoliday) {
            const Holiday = parseInt(getHoliday[days].Start_Date.substring(0, 2))
            if (Holiday == getDaysInMonth[array]) {
                getDaysInMonth.splice(array, 1);
            }
        }
    }
    let labels = [];
    let dataWork = [];
    let dataPlan = [];
    var workTotalHour = (getDaysInMonth.length * 8)
    for (const key in Manpower) {
        var totalWork = 0;
        if (Manpower[key].Leave != null) {
            // console.log(Manpower[key].Name);
            var leaveDate = parseInt(Manpower[key].Leave.Days);
            totalWork = ((getDaysInMonth.length - leaveDate) * 8)
        } else {
            totalWork = getDaysInMonth.length * 8
        }
        labels[key] = Manpower[key].Name
        dataWork[key] = totalWork
        dataPlan[key] = (workTotalHour - totalWork);
    }


    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Work",
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    data: dataWork,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                },
                {
                    label: "Plan",
                    backgroundColor: 'rgba(54, 162, 235, 0.3)',
                    data: dataPlan,
                    borderColor: 'rgba(54, 162, 235, 0.4)',
                    borderWidth: 3
                },

            ]
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

const getWeekdaysInmonth = (year, month) => {
    const days = [];

    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        if (![0, 6].includes(date.getDay())) days.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }

    return days;
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}