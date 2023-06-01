
const validateForm = ({ name, marks, grade, feedback }) => {

    function isValidName(name) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(name);
    }
    if ((name.length <= 0) || (!isValidName(name))) {
      return { msg: 'Enter valid student name', sts: false };
    }
    
    if (marks.length <= 0) {
      return { msg: 'Enter marks', sts: false };
    }
    
    // Convert the marks to a number for comparison
    const marksValue = Number(marks);
    
    if (isNaN(marksValue) || marksValue >= 100) {
      return { msg: 'Marks should be less than 100', sts: false };
    }
    
    var e = document.getElementById("grade")
    var strUser= e.options[e.selectedIndex].value
    var strUser1= e.options[e.selectedIndex].text
    if(strUser==0) return { msg: 'Please select a grade', sts: false };


    return { sts: 'success', msg: 'All fields are valid' };
  }
  





function apiCreateNewMark(mark, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/mark/', mark, {headers})
        .then(res => {
            form.reset()
            window.alert("Marks added successfully")
            
            window.location.href="./list-mark.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formMark=document.getElementById('formMark')
    formMark.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const mark = Object.fromEntries(formData.entries())
        console.log(mark)
        const {sts, msg} = validateForm(mark)
        if (sts) apiCreateNewMark(mark, formMark)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()