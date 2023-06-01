const validateForm= ({date, notification}) => {

        if (notification.length <= 0) return { msg: 'Enter the notification', sts: false }
        const currentDate= new Date();
        if (date <currentDate) return { msg: 'Past date should not be selected', sts: false }
    
        return { sts: 'success', msg: 'All fields are valid' }
      
    }
    
    
    
    const readIdQueryParam = () => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        return params.id
    }
    
    console.log(readIdQueryParam())
    
    function apiGetStudentDetails() {
        const id = readIdQueryParam()
    
        axios.get(`http://localhost:8080/student/${id}`)
            .then(httpReponse => httpReponse.data)
            .then(data => populateForm(document.getElementById('formStudent'), data.bd))
            .catch(err => console.log(err))
    }



function apiUpdateExistingForm(student, form) {
        console.log(student.id)
        axios.put(`http://localhost:8080/student/`, student)
            .then(httpResponse => httpResponse.data)
                // window.alert("Course updated successfully")
                // window.location.href= "../Faculty/list-course.html"
            
            .then(data => {
                console.log(data.msg)
                // console.log(data)
                console.log(student.id)
                window.alert("Student updated successfully")
                window.location.href= "./list-student.html"
            
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
        const formStudent = document.getElementById('formStudent')
        formStudent.onsubmit = ev => { 
            const formData = new FormData(ev.target)
    
            ev.preventDefault() 
            console.log(ev)
    
            const rawData = Object.fromEntries(formData.entries()) 
            console.log(rawData)
    
            const id = readIdQueryParam()
    
            const student = { ...rawData, id }
            console.log(student)
    
            const {sts, msg} = validateForm(student)
            if (sts) apiUpdateExistingForm(student, formStudent)
            else{
                err.style.display='block'
                err.innerHTML=`<strong>${msg}</strong>`
            }
    
             
        }
    }
    
    
    setupForm()
    
    apiGetStudentDetails()
    
    