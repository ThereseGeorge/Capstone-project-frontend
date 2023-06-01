const validateForm = ({ name, marks, grade, feedback }) => {

    function isValidName(name) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(name);
    }
    if ((name.length <= 0) || (!isValidName(name))) {
      return { msg: 'Enter valid student name', sts: false };
    }
    
    if (marks.length <= 0) {
      return { msg: 'Enter marks', sts: false };
    }
    
    // Convert the marks to a number for comparison
    const marksValue = Number(marks);
    
    if (isNaN(marksValue) || marksValue >= 100) {
      return { msg: 'Marks should be less than 100', sts: false };
    }
    
    var e = document.getElementById("grade")
    var strUser= e.options[e.selectedIndex].value
    var strUser1= e.options[e.selectedIndex].text
    if(strUser==0) return { msg: 'Please select a grade', sts: false };


    return { sts: 'success', msg: 'All fields are valid' };
  }


const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())

function apiGetMarkDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/mark/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formMark'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(mark, form) {
    console.log(mark.id)
    axios.put(`http://localhost:8080/mark/`, mark)
        .then(httpResponse => httpResponse.data)
            // window.alert("Course updated successfully")
            // window.location.href= "../Faculty/list-course.html"
        
        .then(data => {
            console.log(data.msg)
            // console.log(data)
            console.log(mark.id)
            window.alert("Mark updated successfully")
            window.location.href= "./list-mark.html"
        
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
    const formMark = document.getElementById('formMark')
    formMark.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) 
        console.log(rawData)

        const id = readIdQueryParam()

        const mark = { ...rawData, id }
        console.log(mark)

        const {sts, msg} = validateForm(mark)
        if (sts) apiUpdateExistingForm(mark, formMark)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }

         
    }
}


setupForm()

apiGetMarkDetails()