const validateForm = ({ courseName, date, time, link }) => {

    function isValidName(courseName) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(courseName);
    }


    if ((courseName.length <= 0) || (!isValidName(courseName))) return { msg: 'Invalid course name', sts: false }

    const currentDate = new Date();
    const inputDate = new Date(date);

    // Set the time of the current date to the beginning of the day
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate.getTime() < currentDate.getTime()) {
        return { msg: 'Past date should not be selected', sts: false };
    }

    const currentTime = new Date();
    const inputTime = new Date(`${date}T${time}`);
    if (inputTime <currentTime) return { msg: 'Time should not be in past', sts: false }

    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
    if (link.length <= 0 || (!link.match(urlRegex))) return { msg: 'Enter the link', sts: false }


    return { sts: 'success', msg: 'All fields are valid' }

}




const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())

function apiGetScheduleDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/schedule/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formSchedule'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(schedule, form) {
    console.log(schedule.id)
    axios.put(`http://localhost:8080/schedule/`, schedule)
        .then(httpResponse => httpResponse.data)
            // window.alert("Course updated successfully")
            // window.location.href= "../Faculty/list-course.html"
        
        .then(data => {
            console.log(data.msg)
            // console.log(data)
            console.log(schedule.id)
            window.alert("Schedule updated successfully")
            window.location.href= "../ClassSchedule/list-schedule.html"
        
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
    const formSchedule = document.getElementById('formSchedule')
    formSchedule.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) 
        console.log(rawData)

        const id = readIdQueryParam()

        const schedule = { ...rawData, id }
        console.log(schedule)

        const {sts, msg} = validateForm(schedule)
        if (sts) apiUpdateExistingForm(schedule, formSchedule)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

         
    }
}


setupForm()

apiGetScheduleDetails()



