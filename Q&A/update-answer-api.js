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

function apiGetAnswerDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/questions/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formAnswer'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(answers, form) {
    const id = readIdQueryParam()
    console.log(answers.id)
    axios.put(`http://localhost:8080/questions/answer/${id}`, answers)
        .then(httpResponse => httpResponse.data)
            // window.alert("Course updated successfully")
            // window.location.href= "../Faculty/list-course.html"
        
        .then(data => {
            console.log(data.msg)
            // console.log(data)
            console.log(answers.id)
            window.alert("Answer updated successfully")
            window.location.href= "./list-answer.html"
        
        })
        .catch(err => console.log(err))
}

// function populateForm(form, data) {
//     console.log(data)
//     const { elements } = form; 

//     console.log(elements)

//     const entries = Object.entries(data) 
//     console.log(entries)

//     for (const entry of entries) {
        
//         console.log(entry)
        

//         const [key, value] = entry
//         const inputField = elements.namedItem(key)
//         console.log(inputField)
//         if (inputField) inputField.value = value
//     }

// }


function populateForm(form, data, prefix = '') {
    const { elements } = form;

    for (const [key, value] of Object.entries(data)) {
        const inputField = elements.namedItem(prefix + key);

        if (inputField) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                populateForm(form, value, `${prefix + key}.`);
            } else {
                inputField.value = value;
            }
        }
    }
}



function setupForm() {
    
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formAnswer = document.getElementById('formAnswer')
    formAnswer.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) 
        console.log(rawData)

        const id = readIdQueryParam()

        const answers = { ...rawData, id }
        console.log(answers)

        const {sts, msg} = validateForm(answers)
        if (sts) apiUpdateExistingForm(answers, formAnswer)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

         
    }
}


setupForm()

apiGetAnswerDetails()