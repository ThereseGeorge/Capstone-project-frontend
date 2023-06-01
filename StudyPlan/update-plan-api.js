const validateForm= ({startDate, targetDate, plan, progress}) => {

    if (plan.length <= 0) return { msg: 'Enter the plan', sts: false }
    if (progress.length <= 0) return { msg: 'Enter the progress', sts: false }
    if (!validateDate(startDate,targetDate)) return { msg: 'Choose start date before target date', sts: false }

    // const currentDate= new Date();
    // if (startDate <currentDate) return { msg: 'Past date should not be selected', sts: false }

    return { sts: 'success', msg: 'All fields are valid' }
  
    
}

function validateDate(startDate, targetDate) {
    
    const start = new Date(startDate);
    const target = new Date(targetDate);
    return start<target;
}


const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())

function apiGetPlanDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/plan/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formPlan'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(plan, form) {
    console.log(plan.id)
    axios.put(`http://localhost:8080/plan/`, plan)
        .then(httpResponse => httpResponse.data)
            // window.alert("Course updated successfully")
            // window.location.href= "../Faculty/list-course.html"
        
        .then(data => {
            console.log(data.msg)
            // console.log(data)
            console.log(plan.id)
            window.alert("Study plan updated successfully")
            window.location.href= "../StudyPlan/list-plan.html"
        
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
    const formPlan = document.getElementById('formPlan')
    formPlan.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) 
        console.log(rawData)

        const id = readIdQueryParam()

        const plan = { ...rawData, id }
        console.log(plan)

        const {sts, msg} = validateForm(plan)
        if (sts) apiUpdateExistingForm(plan, formPlan)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

         
    }
}


setupForm()

apiGetPlanDetails()
