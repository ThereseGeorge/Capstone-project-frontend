function setUpTable() {
    const table = document.getElementById('tableNotification')
    apiFetchAllNotifications(table)

}



setUpTable()

function populateActualData(table, notifications) {

    for (const list of notifications) {

        const { id, date, notification } = list
        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = date
        row.insertCell(2).innerHTML = notification
        

    }
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

