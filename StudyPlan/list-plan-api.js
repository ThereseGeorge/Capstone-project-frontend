function setUpTable() {
    const table = document.getElementById('tablePlan')
    apiFetchAllPlans(table)

}



setUpTable()

function populateActualData(table, plans) {

    for (const list of plans) {

        const { id, startDate, targetDate, plan, progress} = list
        const updatePageUrl = `./update-plan.html?id=${id}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-plan.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = startDate
        row.insertCell(2).innerHTML = targetDate
        row.insertCell(3).innerHTML = plan
        row.insertCell(4).innerHTML = progress
        row.insertCell(5).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
            <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
            <a class="btn btn-danger" onclick='deletePlan(${id})'>Delete</a>`

    }
}



function deletePlan(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8080/plan/${id}`)
        .then(function (response) {
            console.log('Study plan deleted')
            window.alert("Study Plan deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
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
