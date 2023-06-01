const validateForm = ({ userName, password,  role }) => {
    



    const passwordValidation = validatePassword(password); 
    if (!passwordValidation.sts) {
        return { msg: passwordValidation.message, sts: false };
    }

    const roles = ['Teacher', 'User','Admin']


    function isValidName(userName) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(userName);
    }
    
    const dropDown=document.querySelector('#role')
    
    if (userName.length<=0)  return {msg:'Please enter the user name', sts: false}
    if(!isValidName(userName)) return {msg:'Please enter a valid name', sts: false}
    if((role.length<=0) || !roles.includes(role)) return {msg:'Please select the role', sts: false}

    var e = document.getElementById("role")
    var strUser= e.options[e.selectedIndex].value
    if(strUser==0) return { msg: 'Please select a role', sts: false };

    

    return { sts: true, msg: 'All fields are valid' };
};



const validatePassword = (password) => {
    if (password.length < 8) {
        return { sts: false, message: 'Password must be at least 8 characters long.' };
    }

    if (!/[A-Z]/.test(password)) {
        return { sts: false, message: 'Password must contain at least one uppercase letter.' };
    }

    if (!/[a-z]/.test(password)) {
        return { sts: false, message: 'Password must contain at least one lowercase letter.' };
    }

    if (!/\d/.test(password)) {
        return { sts: false, message: 'Password must contain at least one number.' };
    }

    return { sts: true, message: 'Password is valid.' };
};

function setupForm() {

    const err = document.getElementById('errDiv')
    err.style.display = 'none'

    const formSignup = document.getElementById('formRegistration')

    formSignup.onsubmit = ev => {

        ev.preventDefault()

        const formData = new FormData(ev.target)

        const user = Object.fromEntries(formData.entries())

        const { sts, msg } = validateForm(user)

        if (sts) apiSignup(user, formSignup)
        else {
            err.style.display = 'block'
            err.innerHTML = `<strong>${msg}</strong>`
        }

    }
}

setupForm()

function apiSignup(user, form) {
    const headers = {
        'content-type': 'application/json'
    }
    axios.post('http://localhost:8080/user/', user, { headers })

        .then(res => {
            alert("User Registered Successfully")
            window.location.href="../Loginpage/login.html"
            form.reset()
            
        }).catch(err => {
            console.log(err)
            alert("User Registration unsuccessful. User already exists.")
        })
}























// const validateForm=({userName ,password, role}) =>{

//     const roles = ['Teacher', 'User','Admin']


//     function isValidName(userName) {
//         const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
//         return regex.test(userName);
//     }
    
//     const dropDown=document.querySelector('#role')
    
//     if (userName.length<=0)  return {msg:'Please enter the user name', sts: false}
//     if(!isValidName(userName)) return {msg:'Please enter a valid name', sts: false}
//     if((role.length<=0) || !roles.includes(role)) return {msg:'Please select the role', sts: false}

//     var e = document.getElementById("role")
//     var strUser= e.options[e.selectedIndex].value
//     if(strUser==0) return { msg: 'Please select a role', sts: false };


//     const validatePassword = (password) => {
//         if (password.length < 8) {
//             return { sts: false, message: 'Password must be at least 8 characters long.' };
//         }
    
//         if (!/[A-Z]/.test(password)) {
//             return { sts: false, message: 'Password must contain at least one uppercase letter.' };
//         }
    
//         if (!/[a-z]/.test(password)) {
//             return { sts: false, message: 'Password must contain at least one lowercase letter.' };
//         }
    
//         if (!/\d/.test(password)) {
//             return { sts: false, message: 'Password must contain at least one number.' };
//         }
    
//         return { sts: true, message: 'Password is valid.' };
//     };   



//     // if(!isValidName(userName)) return {msg:'Please enter a valid name', sts: false}
//     // if(userName.length < 3) return {msg:'Please enter a valid name', sts: false}
//     // if(!isvalidEmail(email)) return {msg:'Please enter a valid email ', sts: false}
//     // if(password.length<=8 ) return {msg:'Please enter a valid password ', sts: false}
//     // if (!isvalidEmail || password.length<=6 ) return {msg:'Please enter a valid email and password', sts: false}
    

//     return {sts: 'success', msg:'Valid registration"'}
// }

// function setUpRegistrationForm() {

//     const errDiv=document.getElementById('errDiv')
//     errDiv.style.display='none'

//     const formRegistration = document.getElementById('formRegistration')
//     formRegistration.addEventListener('submit', (event) => {
//         event.preventDefault();
        
//         const formData=new FormData(event.target)
//         const registration = Object.fromEntries(formData.entries())
//         console.log(registration)
        
//         const {sts,msg} =validateForm((registration))
//         if(sts) apiRegisterUser(registration, formRegistration);
//         else{
//             errDiv.style.display='block'
//             errDiv.innerHTML=`<strong>${msg}</strong>`
//         }
//     });
// }


// setUpRegistrationForm()


// function apiRegisterUser(registration, form) {

//     const headers = {
//         'content-type': 'application/json'

//     }

//     axios.post('http://localhost:8080/user/', registration, { headers })
//         .then(res => {
//             console.log(res.data)
//             //showSuccessModal()
//             alert("User Registered Successfully")
//             window.location.href="../Loginpage/login.html"
//             form.reset()
           
            
//         })
//         .catch(err => {
//             console.log(err)
//             alert("User Registration unsuccessful")
//         })
// }


// // function showSuccessModal() {
// //     const myModalEl = document.getElementById('successModal');
// //     const modal = new bootstrap.Modal(myModalEl)
// //     modal.show()
// // }