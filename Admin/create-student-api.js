const validateForm= ({name, email}) => {

    if (name.length <= 0) return { msg: 'Enter the student name', sts: false }
    if (email.length <= 0) return { msg: 'Enter the email', sts: false }

    return { sts: 'success', msg: 'All fields are valid' }
  
}


function apiCreateNewStudent(student, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/student/', student, {headers})
        .then(res => {
            form.reset()
            window.alert("Student added successfully")
            
            window.location.href="./list-student.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formStudent=document.getElementById('formStudent')
    formStudent.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const student = Object.fromEntries(formData.entries())
        console.log(student)
        const {sts, msg} = validateForm(student)
        if (sts) apiCreateNewStudent(student, formStudent)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

setUpForm()





// function apiCreateNewNotification(notification, form){
//     const headers= {
//         'content-type' : 'application/json'
//     }
//     axios.post('http://localhost:8080/notification/', notification, {headers})
//         .then(res => {
//             form.reset()
//             window.alert("Notification added successfully")
            
//             window.location.href="./list-notification.html"
//             //showSuccessModal()
//         })
//         .catch(err => console.log(err))

// }

// function setUpForm(){
//     const err=document.getElementById('errDiv')
//     err.style.display='none'
//     const formNotification=document.getElementById('formNotification')
//     formNotification.onsubmit=ev => {
//         ev.preventDefault()
//         console.log(ev)
//         const formData = new FormData(ev.target)
//         const notification = Object.fromEntries(formData.entries())
//         console.log(notification)
//         const {sts, msg} = validateForm(notification)
//         if (sts) apiCreateNewNotification(notification, formNotification)
//         else{
//             err.style.display='block'
//             err.innerHTML=`<strong>${msg}</strong>`
//         }
//     }
// }

//  setUpForm()