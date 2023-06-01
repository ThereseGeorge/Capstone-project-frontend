function setupTable() {
    const table = document.getElementById('tableEnrolledStudents')

    const btnSearch = document.getElementById('btnSearch')
    const courseSearch = document.getElementById('courseSearch')
  
    btnSearch.onclick = () => {
      const searchTerm = courseSearch.value.trim()
  
      if (searchTerm === '') {
        alert('Please enter the course')
        return
      }
  
      apiFetchAllCourseByName(table, searchTerm)
    }
  
    apiFetchAllEnrollments(table)
}

 setupTable()

 function apiFetchAllCourseByName(table, courseValue) {
    const url = 'http://localhost:8080/courses/name'
    axios.get(url, {
        params: {
            courseName: courseValue
        }
    })
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            // if (bd.length === 0) alert("No course found")

            populateActualData(table, bd)


        })
        .catch(err => console.log(err))
}



 function populateActualData(table, userEnrollments) {

    while (table.rows.length > 0) {
        table.deleteRow(table.rows.length-1)
    }

    if(userEnrollments.length===0){
        alert('No course found')
        const row= table.insertRow()
        const cell= row.insertCell(0)
        cell.colSpan=3
        cell.innerHTML='No courses found'
        return
    }


    for(const userEnrollment of userEnrollments) {
        console.log(userEnrollment)
        const { courseName, facultyName, userName } = userEnrollment

        const row = table.insertRow()
        row.insertCell(0).innerHTML = courseName
        row.insertCell(1).innerHTML = facultyName 
        row.insertCell(2).innerHTML = userName
    //     row.insertCell(3).innerHTML = `
      
        
    // `       
    }

    
}



function apiFetchAllEnrollments(table) {
    axios.get('http://localhost:8080/user/allStudentEnrolled')
        .then(res => {
           
            const { data } = res
             
            const { sts, msg, bd } = data

            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}