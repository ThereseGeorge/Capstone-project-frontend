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







function apiCreateNewNotification(notification, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/notification/', notification, {headers})
        .then(res => {
            form.reset()
            window.alert("Notification added successfully")
            
            window.location.href="./list-notification.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formNotification=document.getElementById('formNotification')
    formNotification.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const notifications = Object.fromEntries(formData.entries())
        console.log(notifications)
        const {sts, msg} = validateForm(notifications)
        if (sts) apiCreateNewNotification(notifications, formNotification)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()