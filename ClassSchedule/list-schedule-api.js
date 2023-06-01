function setUpTable() {
    const table = document.getElementById('tableSchedule')
    apiFetchAllSchedules(table)

}



setUpTable()

function populateActualData(table, schedules) {

    for (const schedule of schedules) {

        const { id, courseName, date, time, link, recording} = schedule
        const updatePageUrl = `./update-schedule.html?id=${id}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-schedule.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = date
        row.insertCell(3).innerHTML = time
        row.insertCell(4).innerHTML = link
        row.insertCell(5).innerHTML = recording
        row.insertCell(6).innerHTML = `
            <a class = "btn btn-primary btn-sm mb-3" href='${viewPageUrl}'>View </a>
            <a class = "btn btn-primary btn-sm mb-3" href='${updatePageUrl}'>Update </a>
            <a class="btn btn-danger btn-sm mb-3" onclick='deleteSchedule(${id})'>Delete </a>`

    }
}



function deleteSchedule(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8080/schedule/${id}`)
        .then(function (response) {
            console.log('Class schedule deleted')
            window.alert("Class schedule deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}




function apiFetchAllSchedules(table) {
    axios.get('http://localhost:8080/schedule/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}
