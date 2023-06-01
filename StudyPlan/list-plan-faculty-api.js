function setUpTable() {
    const table = document.getElementById('tablePlan')
    apiFetchAllPlans(table)

}



setUpTable()

function populateActualData(table, plans) {

    for (const list of plans) {

        const { id, startDate, targetDate, plan, progress } = list
        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = startDate
        row.insertCell(2).innerHTML = targetDate
        row.insertCell(3).innerHTML = plan
        row.insertCell(4).innerHTML = progress

    }
}




function apiFetchAllPlans(table) {
    axios.get('http://localhost:8080/plan/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}