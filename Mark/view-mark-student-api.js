const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetMarkDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/mark/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateTableDetails(data.bd))
        .catch(err => console.log(err))
}



function populateTableDetails({ id, name, marks, grade, feedback}) {
    // populating invoice details inside a table
    const table = document.getElementById('tableDetails')
    const row = table.insertRow()
    row.insertCell(0).innerHTML = id
    row.insertCell(1).innerHTML = name
    row.insertCell(2).innerHTML = marks
    row.insertCell(3).innerHTML = grade
    row.insertCell(4).innerHTML = feedback
   
}

apiGetMarkDetails()