function setUpTable() {
    const table = document.getElementById('tableFaculty')
    apiFetchAllFaculties(table)

}



setUpTable()

function populateActualData(table, faculties) {

    for (const list of faculties) {

        const { id, name, email } = list
        const updatePageUrl = `./update-faculty.html?id=${id}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-faculty.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = name
        row.insertCell(2).innerHTML = email
        row.insertCell(3).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
            <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
            <a class="btn btn-danger" onclick='deleteFaculty(${id})'>Delete</a>`

    }
}



function deleteFaculty(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8080/faculty/${id}`)
        .then(function (response) {
            console.log('Faculty deleted')
            window.alert("Faculty deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}




function apiFetchAllFaculties(table) {
    axios.get('http://localhost:8080/faculty/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

