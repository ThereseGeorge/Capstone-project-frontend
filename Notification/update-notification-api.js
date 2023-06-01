const validateForm= ({date, notification}) => {

    if (notification.trim().length === 0) {
        return { msg: 'Enter the notification', sts: false };
    }
    

    const currentDate = new Date();
    const inputDate = new Date(date);
    
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate.getTime() < currentDate.getTime()) {
        return { msg: 'Past date should not be selected', sts: false };
    }


    return { sts: 'success', msg: 'All fields are valid' }
  
}



const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())

function apiGetNotificationDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/notification/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formNotification'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(notification, form) {
    console.log(notification.id)
    axios.put(`http://localhost:8080/notification/`, notification)
        .then(httpResponse => httpResponse.data)
            // window.alert("Course updated successfully")
            // window.location.href= "../Faculty/list-course.html"
        
        .then(data => {
            console.log(data.msg)
            // console.log(data)
            console.log(notification.id)
            window.alert("Notification updated successfully")
            window.location.href= "./list-notification.html"
        
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
    const formNotification = document.getElementById('formNotification')
    formNotification.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) 
        console.log(rawData)

        const id = readIdQueryParam()

        const notification = { ...rawData, id }
        console.log(notification)

        const {sts, msg} = validateForm(notification)
        if (sts) apiUpdateExistingForm(notification, formNotification)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

         
    }
}


setupForm()

apiGetNotificationDetails()

