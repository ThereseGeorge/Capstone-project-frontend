function setUpTable() {
    const table = document.getElementById('tableAnswer')
    apiFetchAllAnswers(table)

}



setUpTable()

function populateActualData(table, answers) {

    if (!Array.isArray(answers)) {
        console.error('Invalid questions data. Expected an array.');
        return;
    }

    for (const list of answers) {

        //const { id, name, question, answer } = list
        const { id, studentName, question: questionText, answer: answerObj } = list;
        const answer = answerObj ? answerObj.answer : '';

        const addPageUrl = `./create-answer.html?id=${id}`

        const updatePageUrl = `./update-answer.html?id=${id}`

        // './update-course.html?id=${id}'
        //const viewPageUrl = `./view-answer.html?id=${id}`

        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = studentName;
        row.insertCell(2).innerHTML = questionText;
        row.insertCell(3).innerHTML = answer;
        row.insertCell(4).innerHTML = `
            <a class = "btn btn-primary" href='${addPageUrl}'>Add Answer</a>
            <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
            <a class="btn btn-danger" onclick='deleteAnswer(${id})'>Delete</a>`

    }
}


// function populateActualData(table, questions) {
//     if (!Array.isArray(questions)) {
//       console.error('Invalid questions data. Expected an array.');
//       return;
//     }
  
//     for (const question of questions) {
//       const { id, studentName, question: questionText, answer: answerObj } = question;
//       const answer = answerObj ? answerObj.answer : ''; // Access the nested answer field
  
//       const row = table.insertRow();
//       row.insertCell(0).innerHTML = id;
//       row.insertCell(1).innerHTML = studentName;
//       row.insertCell(2).innerHTML = questionText;
//       row.insertCell(3).innerHTML = answer;
//     }
//   }



function deleteAnswer(id) {
    console.log(id)
    //id = Number(id);
    axios.delete(`http://localhost:8080/questions/answer/${id}`)
        .then(function (response) {
            console.log(' Answer deleted')
            window.alert(" Answer deleted successfully")

        })
        .catch(function (error) {
            // Handle error response
            console.log(error)
        })
}




function apiFetchAllAnswers(table) {
    axios.get('http://localhost:8080/questions')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}
