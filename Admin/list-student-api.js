function setUpTable(){
    const table=document.getElementById('tableStudent')
    apiFetchAllStudents(table)
    
}

setUpTable()

function populateActualData(table, students){
    for(const list of students){
        const{id, name, email} =  list
        const updateStudentUrl= './update-student.html?id=${id}'
        const viewStudentUrl= './view-student.html?id=${id}'

        const row=table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = name
        row.insertCell(2).innerHTML = email
        row.insertCell(3).innerHTML = `
            <a class = "btn btn-primary" href='${viewStudentUrl}'>View</a>
            <a class = "btn btn-primary" href='${updateStudentUrl}'>Update</a>
            <a class = "btn btn-danger" onclick='deleteStudent(${id})'>Delete</a>`
    }
}


function deleteStudent(id) {
        console.log(id)
       
        axios.delete(`http://localhost:8080/student/${id}`)
            .then(function (response) {
                console.log('Student deleted')
                window.alert("Student deleted successfully")
    
            })
            .catch(function (error) {
                // Handle error response
                console.log(error)
            })
    }

function apiFetchAllStudents(table){
    axios.get('http://localhost:8080/student/')
    .then(res=> {
        const{data} =res
        console.log(data)
        const{ sts, msg, bd } = data  
        populateActualData(table, bd)
    })
    .catch(err=>console.log(err))
}


