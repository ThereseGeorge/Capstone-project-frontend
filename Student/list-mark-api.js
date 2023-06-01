
  
  
  

function setUpTable() {
    const table = document.getElementById('tableMark');
    apiFetchAllMarks(table);
}

setUpTable();

function populateActualData(table, marks) {
    const studentNames = [];
    const marksData = [];

    for (const mark of marks) {
        const { id, name, marks, grade, feedback } = mark;
        const updatePageUrl = `./update-mark.html?id=${id}`;
        const viewPageUrl = `./view-mark.html?id=${id}`;

        const row = table.insertRow();
        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = marks;
        row.insertCell(3).innerHTML = grade;
        row.insertCell(4).innerHTML = feedback;
        row.insertCell(5).innerHTML = `
            <a class="btn btn-primary" href="${viewPageUrl}">View</a>
            <a class="btn btn-primary" href="${updatePageUrl}">Update</a>
            <a class="btn btn-danger" onclick="deleteMark(${id})">Delete</a>`;

        studentNames.push(name);
        marksData.push(marks);
    }
    createLineChart(studentNames, marksData);
}

function deleteMark(id) {
    axios
        .delete(`http://localhost:8080/mark/${id}`)
        .then(function (response) {
            console.log('Mark deleted');
            window.alert('Mark deleted successfully');
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apiFetchAllMarks(table) {
    axios
        .get('http://localhost:8080/mark/')
        .then(function (response) {
            const { data } = response;
            const { sts, msg, bd } = data;
            populateActualData(table, bd);
        })
        .catch(function (error) {
            console.log(error);
        });
}
