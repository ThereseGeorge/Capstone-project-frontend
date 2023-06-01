const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
  }
  
  function setUpTable() {
    const table = document.getElementById('tableCourse')
    apiFetchCourse(table)
  }
  
  setUpTable()
  

function populateActualData(table, courses) {
    // check if there are any courses
    if (courses.length === 0) {
      alert('No courses found')
      const message = document.createElement('p')
      message.innerHTML = 'No courses found.'
      table.appendChild(message)
      return
    }
  
    // clear the table first
    table.innerHTML = ''
  
    const grid = document.createElement('div')
    grid.classList.add('grid')
  
    for (const course of courses) {
      const { courseId, courseName, facultyName, startDate, endDate } = course
      const card = document.createElement('div')
      card.classList.add('card')
      const header = document.createElement('h2')
      header.innerHTML = courseName
      const faculty = document.createElement('p')
      faculty.innerHTML = `Faculty: ${facultyName}`
      const dates = document.createElement('p')
      dates.innerHTML = `Schedule: ${startDate} to ${endDate}`
      const updateButton = document.createElement('button')
      updateButton.innerHTML = 'View More'
      updateButton.classList.add('btn', 'btn-success')
      updateButton.setAttribute('data-id', courseId)
      updateButton.addEventListener('click', (event) => {
        const courseId = event.target.getAttribute('data-id')
        window.location.href = `./viewMore.html?id=${courseId}`
      })
      card.appendChild(header)
      card.appendChild(faculty)
      card.appendChild(dates)
      card.appendChild(updateButton)
      grid.appendChild(card)
    }
  
    table.appendChild(grid)
  }

  
  
  function apiFetchCourse(table) {
    const userId = localStorage.getItem("userId");
    console.log(userId)
    const url = `http://localhost:8080/user/getuserEnrollments/${userId}`
    axios.get(url)
        .then(res => {
            const { data } = res
            console.log(data)  
            const { sts, msg, bd } = data
            console.log(bd)
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}

  function enrollByUserId() {
    const userId = localStorage.getItem("userId");
  
    const courseId = readIdQueryParam()
    console.log(userId,courseId)
    
    const headers = {
        'content-type': 'application/json'
    }
    axios.post(`http://localhost:8080/user/${userId}/userEnrollments/${courseId}`, { headers })
  
    .then(()=> {
        //  form.reset()
        window.alert("Student Enrolled successfully")
        //window.location.href="./list-course-students.html"
  
    }).catch(err =>{
        window.alert("Student Already Enrolled")
        //window.location.href="./list-course-students.html"
        console.log(err)
    })
  }
  
 