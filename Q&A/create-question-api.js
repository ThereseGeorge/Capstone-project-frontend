const validateForm= ({studentName, question}) => {


    function isValidName(studentName) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(studentName);
      }
    
    if(!isValidName(studentName)) return {msg:'Please enter a valid name', sts: false}
    if (studentName.length <= 0) return { msg: 'Enter the name', sts: false }
    if (question.length <= 0) return { msg: 'Enter the question', sts: false }
    
    return { sts: 'success', msg: 'All fields are valid' }
  
}







function apiCreateNewQuestion(questions, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/questions/', questions, {headers})
        .then(res => {
            form.reset()
            window.alert("Question added successfully")
            
            window.location.href="./list-question.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formQuestion=document.getElementById('formQuestion')
    formQuestion.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const question = Object.fromEntries(formData.entries())
        console.log(question)
        const {sts, msg} = validateForm(question)
        if (sts) apiCreateNewQuestion(question, formQuestion)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()