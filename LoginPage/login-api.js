const registration = document.getElementById('register-page')
registration.addEventListener("click", (event) => {
  window.location.href = "./registration.html"
})

const validateForm = ({ userName, password }) => {

  // function isvalidEmail(email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }

  //if (!email.validity.valid || !password.validity.valid) return {msg:'Please enter a valid email and password', sts: false}


  function isValidName(userName) {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(userName);
  }

  if(!isValidName(userName)) return {msg:'Please enter a valid name', sts: false}
  if(userName.length < 3) return {msg:'Please enter a valid name', sts: false}

  if (password.length <= 6) return { msg: 'Please enter a valid password ', sts: false }

  return { sts: 'success', msg: 'Valid email and password' }
}

function setUpLoginForm() {

  const errorDiv = document.getElementById('errorDiv');
  errorDiv.style.display = 'none'
  const formLogin = document.getElementById('formLogin');

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const login = Object.fromEntries(formData.entries());
    console.log(login)

    const { sts, msg } = validateForm(login)
    if (sts) apiLoginUser(login, formLogin)

    else {
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = `<strong>${msg}</strong>`
    }

  });

}

setUpLoginForm()



function apiLoginUser(login, form) {

  const headers = {
    'content-type': 'application/json'

  }

  axios.post('http://localhost:8080/user/loginv2', login, { headers })
    .then(res => {
      console.log(res)
      console.log(res.data.bd)
      form.reset()
      //alert("Logged-in successfully")
      //showSuccessModal()
      return res.data
    })
    .then(data => {

      const {role, userId} = data.bd
      localStorage.setItem("userId", userId)
      if (role === 'User') {
        window.location.href = '../Student/student-dashboard.html'
      }
      else if (role === 'Teacher') {
        window.location.href = '../Faculty/faculty-portal.html'
      }
      else window.location.href = '../Admin/admin-dashboard.html'
    })
    .catch(err => {
      console.log(err)
      const errorMsg = document.getElementById('errorDiv');
      errorMsg.style.display = 'block'
      errorMsg.innerHTML = `<strong>${err.response.data.msg}</strong>`

    })

}

















// const validateForm = ({ userName, password }) => {

//   if (userName.length <= 0) return { msg: 'invalid username', sts: false }
//   if (password.length <= 0) return { msg: 'invalid password', sts: false }


//   return { sts: 'success', msg: 'all fields are valid' }
// }

// function setupForm() {

//   const err = document.getElementById('errorDiv')
//   err.style.display = 'none'

//   const formSignup = document.getElementById('formLogin')

//   formSignup.onsubmit = ev => { // when form is submitted, this function would be called

//     ev.preventDefault() // stop the default behaviour of refreshing the page

//     const formData = new FormData(ev.target) // ev.target points to form tag in the html

//     const user = Object.fromEntries(formData.entries()) // you are converting form data to js object
//     console.log(user)

//     const { sts, msg } = validateForm(user)

//     if (sts) apiLogin(user, formSignup)
//     else {
//       err.style.display = 'block'
//       err.innerHTML = `<strong>${msg}</strong>`
//     }
//   }
// }

// setupForm()

// function apiLogin(user, form) {
//   const headers = {
//     'content-type': 'application/json'
//   }

//   axios.post('http://localhost:8080/user/loginv2', user, { headers })
//     .then(res => {
//       console.log(res)
//       console.log(res.data.bd)
//       form.reset()
//       //alert("Logged-in successfully")
//       //showSuccessModal()
//       return res.data
//     })
//     .then(data => {

//       const { role, userId } = data.bd
//       localStorage.setItem("userId", userId)
//       if (role === 'User') {
//         window.location.href = '../Student/student-dashboard.html'
//       }
//       else if (role === 'Teacher') {
//         window.location.href = '../Faculty/faculty-portal.html'
//       }
//       else window.location.href = '../Admin/admin-dashboard.html'
//     })
//     .catch(err => {
//       console.log(err)
//       const errorMsg = document.getElementById('errorDiv');
//       errorMsg.style.display = 'block'
//       errorMsg.innerHTML = `<strong>${err.response.data.msg}</strong>`

//     })

// }































// function showSuccessModal() {
//   const myModalEl = document.getElementById('successModal');
//   const modal = new bootstrap.Modal(myModalEl)
//   modal.show()
// }

















