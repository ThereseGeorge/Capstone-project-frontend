const validateForm= ({userId, userName, role}) => {

    const roles = ['Teacher', 'User','Admin']

    function isValidName(userName) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(userName);
      }

    
    
    if(!isValidName(userName)) return {msg:'Please enter a valid name', sts: false}
    if (userId.length <= 0) return { msg: 'Enter the ID', sts: false }
    if (userName.length <= 0) return { msg: 'Enter the userName', sts: false }
    if((role.length<=0) || !roles.includes(role)) return {msg:'Please select the role', sts: false}

    return { sts: 'success', msg: 'All fields are valid' }
  
}




const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.userId
  }

console.log(readIdQueryParam())

function apiGetCourseDetails() {
    const userId = readIdQueryParam()
    console.log(userId)

    axios.get(`http://localhost:8080/user/getUserById/${userId}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formUser'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(course, form) {
    const userId = readIdQueryParam()
    axios.put(`http://localhost:8080/user/updateUser`, course)
        .then(httpResponse => {
            httpResponse.data
            window.alert("User updated successfully")
            window.location.href= "./list-user.html"
        })
        .then(data => {
            console.log(data.msg)
        
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
    const formCourse = document.getElementById('formUser')

    formCourse.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) // you are converting form data to js object
        console.log(rawData)

        const id = readIdQueryParam()

    
        const course = { ...rawData, id }
        console.log(course)
        const {sts, msg} = validateForm(course)
        if (sts) apiUpdateExistingForm(course, formCourse)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

       // we are pass form object to reset the form on success
    }
}


setupForm()

apiGetCourseDetails()