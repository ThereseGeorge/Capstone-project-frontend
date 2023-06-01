const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetPlanDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/plan/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateTableDetails(data.bd))
        .catch(err => console.log(err))
}



function populateTableDetails({ id, startDate, targetDate, plan, progress }) {
    // populating invoice details inside a table
    const table = document.getElementById('tableDetails')
    const row = table.insertRow()
    row.insertCell(0).innerHTML = id
    row.insertCell(1).innerHTML = startDate
    row.insertCell(2).innerHTML = targetDate
    row.insertCell(3).innerHTML = plan
    row.insertCell(4).innerHTML = progress
    
}

apiGetPlanDetails()
