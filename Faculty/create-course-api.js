const validateForm= ({courseName, facultyName, startDate, endDate, material, recording}) => {

    function isValidName(courseName) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(courseName);
    }

    function isValidName(facultyName) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(facultyName);
    }

    if ((courseName.length <= 0) || (!isValidName(courseName))) return { msg: 'Invalid course name', sts: false }
    if ((facultyName.length <= 0) || (!isValidName(facultyName))) return { msg: 'Invalid faculty name', sts: false }

    if (!validateDate(startDate,endDate)) return { msg: 'Choose start date before end date', sts: false }
    if (material.length <= 0) return { msg: 'Invalid material link', sts: false }
    if (recording.length <= 0) return { msg: 'Invalid recording link', sts: false }
  

    return { sts: 'success', msg: 'All fields are valid' }

    
}

function validateDate(startDate, endDate) {
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start<end;
}





function apiCreateNewCourse(course, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/courses/createNewCourse', course, {headers})
        .then(res => {
            form.reset()
            window.alert("Course added successfully")
            
            window.location.href="./list-course.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formCourse=document.getElementById('formCourse')
    formCourse.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const course = Object.fromEntries(formData.entries())
        console.log(course)
        const {sts, msg} = validateForm(course)
        if (sts) apiCreateNewCourse(course, formCourse)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()

// function showSuccessModal(){
//     const myModalEl = document.getElementById('successModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()
// }

