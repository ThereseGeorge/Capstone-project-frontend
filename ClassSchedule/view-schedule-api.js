const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetScheduleDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/schedule/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateTableDetails(data.bd))
        .catch(err => console.log(err))
}



function populateTableDetails({ id, date, time, link, recording }) {
    // populating invoice details inside a table
    const table = document.getElementById('tableDetails')
    const row = table.insertRow()
    row.insertCell(0).innerHTML = id
    row.insertCell(1).innerHTML = date
    row.insertCell(2).innerHTML = time
    row.insertCell(3).innerHTML = link
    row.insertCell(4).innerHTML = recording
}

apiGetScheduleDetails()
