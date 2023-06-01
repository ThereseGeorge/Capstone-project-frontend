function setUpTable() {
    const table = document.getElementById('tableMark')
    apiFetchAllMarks(table)

}



setUpTable()

function populateActualData(table, mark) {

    for (const list of mark) {

        

        const { id, name, marks, grade, feedback } = list

        const viewPageUrl = `./view-mark-student.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = name
        row.insertCell(2).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View Marks</a>`
        
    }
}




function apiFetchAllMarks(table) {
    axios.get('http://localhost:8080/mark/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}