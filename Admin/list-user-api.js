function setUpTable() {
    const table = document.getElementById('tableCourse')
    apiFetchAllUsers(table)
  }

setUpTable()



function populateActualData(table, courses) {

    // while (table.rows.length > 0) {
    //     table.deleteRow(table.rows.length - 1);
    // }
    for(const list of courses) {

        const { userId, userName, role } = list

        const updatePageUrl = `./update-user.html?userId=${userId}`
        //const viewPageUrl = `../studnet/course-details.html?userId=${userId}`


        const row = table.insertRow()
        row.insertCell(0).innerHTML = userId
        row.insertCell(1).innerHTML = userName
        row.insertCell(2).innerHTML = role   
      
        row.insertCell(3).innerHTML = `
       
        <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
        <a class='btn btn-danger' href='#' onclick='deleteUser(${userId})'>Delete</a>`
    }
}



function apiFetchAllUsers(table) {
    axios.get('http://localhost:8080/user/users')
        .then(res => {
           
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}


function deleteUser(userId) {
    console.log(userId)
    //id = Number(id);
    axios.delete(`http://localhost:8080/user/delete/${userId}`)
        .then(function (response) {
            console.log('User deleted')
            window.alert("User deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}




// function apiCallDeleteCourse(userId, modal) {
//     const url = `http://localhost:8080/user/delete/${userId}`

//     axios.delete(url)
//         .then(res => res.data) // you converted complete response in to our business reponse
//         // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below
//         .then( ({ sts, msg, bd }) =>  modal.hide())
//         .then (window.location.reload())
//         .catch(console.log)
// }




// function showConfirmDeleteModal(userId) {
//     console.log('clicked ' + userId)
//     const myModalEl = document.getElementById('deleteModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()

//     const btDl = document.getElementById('btDl')
//     btDl.onclick = () => {
//         apiCallDeleteCourse(userId, modal)
        
//         window.location.reload()
        
//     }
// }

