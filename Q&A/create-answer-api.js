const validateForm= ({answer}) => {

    if (answer.length <= 0) return { msg: 'Enter the answer and submit', sts: false }
    
    return { sts: 'success', msg: 'All fields are valid' }
  
}


const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())




function apiCreateNewAnswer(answers, form, ){
    const headers= {
        'content-type' : 'application/json'
    }
    const id = readIdQueryParam()

    axios.post(`http://localhost:8080/questions/answer/${id}`, answers, {headers})
        .then(res => {
            form.reset()
            window.alert("Answer added successfully")
            
            window.location.href="./list-answer.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formAnswer=document.getElementById('formAnswer')
    formAnswer.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const answer = Object.fromEntries(formData.entries())
        console.log(answer)
        const {sts, msg} = validateForm(answer)
        if (sts) apiCreateNewAnswer(answer, formAnswer)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()