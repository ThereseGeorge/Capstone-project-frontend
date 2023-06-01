// function setUpTable() {
//     const table = document.getElementById('tableCourse')
//     apiFetchAllCourses(table)

// }

// setUpTable()

// function populateActualData(table, courses) {
//     for (const course of courses) {

//         const { courseId, courseName, facultyName, startDate, endDate, material, recording } = course
//         const updatePageUrl = `./update-course.html?courseId=${courseId}`


//         // './update-course.html?id=${id}'
//         const viewPageUrl = `./view-course.html?courseId=${courseId}`

//         const row = table.insertRow()

//         row.insertCell(0).innerHTML = courseId
//         row.insertCell(1).innerHTML = courseName
//         row.insertCell(2).innerHTML = facultyName
//         row.insertCell(3).innerHTML = startDate
//         row.insertCell(4).innerHTML = endDate
//         row.insertCell(5).innerHTML = material
//         row.insertCell(6).innerHTML = recording
//         row.insertCell(7).innerHTML =   `
//             <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
//             <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
//             <a class="btn btn-danger" onclick='deleteCourse(${courseId})'>Delete</a>`



//     }
// }



// function deleteCourse(courseId) {
//     console.log(courseId)
//     //id = Number(id);
//     axios.delete(`http://localhost:8080/courses/delete/${courseId}`)
//         .then(function (response) {
//             console.log('Course deleted')
//             window.alert("Course deleted successfully")

//         })
//         .catch(function (error) {
//             // Handle error response
//             console.log(error)
//         })
// }





// function apiFetchAllCourses(table) {
//     axios.get('http://localhost:8080/courses/list')
//         .then(res => {
//             const { data } = res
//             console.log(data)
//             const { sts, msg, bd } = data
//             populateActualData(table, bd)
//         })
//         .catch(err => console.log(err))
// }

// function apiCallDeleteCourse(id, modal){
//     const url= 'http://localhost:8080/course/${id}'
//     axios.delete(url)
//         .then(res => res.data)
//         .then( ({ sts, msg, bd }) =>  modal.hide() )
//         .catch(console.log)
// }

































function setUpTable() {
    const table = document.getElementById('tableCourse')
    const courseSearch = document.getElementById('courseSearch')


    btnSearch.onclick = () => {

        const searchTerm = courseSearch.value.trim()

        if (searchTerm === '') {
            alert('Please enter the course')
            return
        }

        apiFetchAllCourseByName(table, document.getElementById('courseSearch').value)

    }

    apiFetchAllCourses(table)

}







setUpTable()

function populateActualData(table, courses) {


    while (table.rows.length > 1) {
        table.deleteRow(1)
    }

    if (courses.length === 0) {
        alert('No course found')
        const row = table.insertRow()
        const cell = row.insertCell(0)
        cell.colSpan = 7
        cell.innerHTML = 'No courses found.'
        return
    }



    for (const course of courses) {

        const { courseId, courseName, facultyName, startDate, endDate, material, recording } = course
        const updatePageUrl = `./update-course.html?courseId=${courseId}`


        // './update-course.html?id=${id}'
        const viewPageUrl = `./view-course.html?courseId=${courseId}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = courseId
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = facultyName
        row.insertCell(3).innerHTML = startDate
        row.insertCell(4).innerHTML = endDate
        row.insertCell(5).innerHTML = material
        row.insertCell(6).innerHTML = recording
        row.insertCell(7).innerHTML = `
            <a class = "btn btn-primary" href='${viewPageUrl}'>View</a>
            <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
            <a class="btn btn-danger" onclick='deleteCourse(${courseId})'>Delete</a>`

    }
}


// http://localhost:8080/courses/delete/17

// http://localhost:8080/notification/${id}

function deleteCourse(courseId) {
    console.log(courseId)
    //id = Number(id);
    axios.delete(`http://localhost:8080/courses/delete/${courseId}`)
        .then(function (response) {
            console.log('Course deleted')
            window.alert("Course deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}


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








function apiFetchAllCourses(table) {
    axios.get('http://localhost:8080/courses/list')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

