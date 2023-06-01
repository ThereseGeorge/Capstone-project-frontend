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



function apiCreateNewPlan(plan, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/plan/', plan, {headers})
        .then(res => {
            form.reset()
            window.alert("Study plan added successfully")
            
            window.location.href="./list-plan.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formPlan=document.getElementById('formPlan')
    formPlan.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const plan = Object.fromEntries(formData.entries())
        console.log(plan)
        const {sts, msg} = validateForm(plan)
        if (sts) apiCreateNewPlan(plan, formPlan)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()