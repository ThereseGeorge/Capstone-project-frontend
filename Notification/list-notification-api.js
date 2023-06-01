function setUpTable() {
    const table = document.getElementById('tableNotification')
    apiFetchAllNotifications(table)

}



setUpTable()

function populateActualData(table, notifications) {

    for (const list of notifications) {

        const { id, date, notification } = list
        const updatePageUrl = `./update-notification.html?id=${id}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-notification.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = date
        row.insertCell(2).innerHTML = notification
        row.insertCell(3).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
            <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
            <a class="btn btn-danger" onclick='deleteNotification(${id})'>Delete</a>`

    }
}



function deleteNotification(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8080/notification/${id}`)
        .then(function (response) {
            console.log('Notification deleted')
            window.alert("Notification deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}




function apiFetchAllNotifications(table) {
    axios.get('http://localhost:8080/notification/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

