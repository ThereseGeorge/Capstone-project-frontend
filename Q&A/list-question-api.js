function setUpTable() {
    const table = document.getElementById('tableQuestion')
    apiFetchAllQuestions(table)

}



setUpTable()

// function populateActualData(table, questions) {

//     for (const list of questions) {

//         const { id, studentName, question, answer} = list
        
//         const createPageUrl = `./create-question.html?id=${id}`


//         // './update-course.html?id=${id}'
//         //const viewPageUrl = `./view-notification.html?id=${id}`

//         const row = table.insertRow()

//         row.insertCell(0).innerHTML = id
//         row.insertCell(1).innerHTML = studentName
//         row.insertCell(2).innerHTML = question
//         row.insertCell(3).innerHTML = answer
        

//     }
// }

function populateActualData(table, questions) {
    if (!Array.isArray(questions)) {
      console.error('Invalid questions data. Expected an array.');
      return;
    }
  
    for (const question of questions) {
      const { id, studentName, question: questionText, answer: answerObj } = question;
      const answer = answerObj ? answerObj.answer : ''; // Access the nested answer field
  
      const row = table.insertRow();
      row.insertCell(0).innerHTML = id;
      row.insertCell(1).innerHTML = studentName;
      row.insertCell(2).innerHTML = questionText;
      row.insertCell(3).innerHTML = answer;
    }
  }


// function populateActualData(table, questions) {
//     if (!Array.isArray(questions)) {
//       console.error('Invalid questions data. Expected an array.');
//       return;
//     }
  
//     for (const list of questions) {
//       const { id, studentName, question, answer } = list;
//       const createPageUrl = `./create-question.html?id=${id}`;
  
//       const row = table.insertRow();
//       row.insertCell(0).innerHTML = id;
//       row.insertCell(1).innerHTML = studentName;
//       row.insertCell(2).innerHTML = question;
//       row.insertCell(3).innerHTML = answer;
//     }
//   }
  





function apiFetchAllQuestions(table) {
    axios.get('http://localhost:8080/questions')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}


