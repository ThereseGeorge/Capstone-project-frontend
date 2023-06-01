const validateForm= ({name, email}) => {

    if (name.length <= 0) return { msg: 'Enter the valid name', sts: false }
    if (email.length <= 0) return { msg: 'Enter the valid email', sts: false }

    return { sts: 'success', msg: 'All fields are valid' }
  
}


const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())

function apiGetFacultyDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/faculty/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formFaculty'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(faculty, form) {
    console.log(faculty.id)
    axios.put(`http://localhost:8080/faculty/`, faculty)
        .then(httpResponse => httpResponse.data)
            // window.alert("Course updated successfully")
            // window.location.href= "../Faculty/list-course.html"
        
        .then(data => {
            console.log(data.msg)
            // console.log(data)
            console.log(faculty.id)
            window.alert("Faculty updated successfully")
            window.location.href= "./list-faculty.html"
        
        })
        .catch(err => console.log(err))
}

function populateForm(form, data) {
    console.log(data)
    const { elements } = form; 
    console.log(elements)

    const entries = Object.entries(data) 
    console.log(entries)

    for (const entry of entries) {
        
        console.log(entry)
        

        const [key, value] = entry
        const inputField = elements.namedItem(key)
        console.log(inputField)
        if (inputField) inputField.value = value
    }

}

function setupForm() {
    
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formFaculty = document.getElementById('formFaculty')
    formFaculty.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) 
        console.log(rawData)

        const id = readIdQueryParam()

        const faculty = { ...rawData, id }
        console.log(faculty)

        const {sts, msg} = validateForm(faculty)
        if (sts) apiUpdateExistingForm(faculty, formFaculty)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

         
    }
}


setupForm()

apiGetFacultyDetails()
