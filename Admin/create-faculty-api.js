const validateForm= ({name, email}) => {

    if (name.length <= 0) return { msg: 'Enter the valid name', sts: false }
    if (email.length <= 0) return { msg: 'Enter the valid email', sts: false }

    return { sts: 'success', msg: 'All fields are valid' }
  
}







function apiCreateNewFaculty(faculty, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/faculty/', faculty, {headers})
        .then(res => {
            form.reset()
            window.alert("Faculty added successfully")
            
            window.location.href="./list-faculty.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formFaculty=document.getElementById('formFaculty')
    formFaculty.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const faculty = Object.fromEntries(formData.entries())
        console.log(faculty)
        const {sts, msg} = validateForm(faculty)
        if (sts) apiCreateNewFaculty(faculty, formFaculty)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()