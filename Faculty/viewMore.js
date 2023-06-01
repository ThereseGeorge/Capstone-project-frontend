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
    const grid = document.createElement('div')
    grid.classList.add('newcard-grid')
    if (!Array.isArray(courses)) {
      courses = [courses]
    }
    for (const course of courses) {
      const { courseName, facultyName, material, recording, startDate, endDate } = course
      const card = document.createElement('div')
      card.classList.add('newcard')
      const header = document.createElement('h2')
      header.innerHTML = courseName
      const faculty = document.createElement('p')
      faculty.innerHTML = `By: ${facultyName}`
      const dates = document.createElement('p')
      dates.innerHTML = `Schedule : ${startDate} to ${endDate}`
      const materialLink = document.createElement('a')
      materialLink.innerHTML = 'Material'
      materialLink.setAttribute('href', material)
      const blankLine = document.createElement('br')
      const recordingLink = document.createElement('a')
      recordingLink.innerHTML = 'Recording'
      recordingLink.setAttribute('href', recording)
    //   const liveClass = document.createElement('a')
    //   liveClass.innerHTML = 'Online Class'
    //   liveClass.setAttribute('href', liveClass)
    const blankLine2 = document.createElement('br')
    const blankLine3 = document.createElement('br')
    const blankLine4 = document.createElement('br')
      const updateButton = document.createElement('button')
      updateButton.innerHTML = 'Live Class'
    updateButton.classList.add('btn', 'btn-success')
    // updateButton.setAttribute('data-id', courseId)
    updateButton.addEventListener('click', (event) => {
    //   const courseId = event.target.getAttribute('data-id')
      window.location.href = `https://meet.google.com/htc-qaiz-wqe`
    })

      card.appendChild(header)
      card.appendChild(faculty)
      card.appendChild(dates)
      card.appendChild(materialLink)
      card.appendChild(blankLine)
      card.appendChild(blankLine)
      card.appendChild(recordingLink)
      card.appendChild(blankLine2)
      card.appendChild(blankLine3)
      card.appendChild(updateButton)
      grid.appendChild(card)
  
    }
    table.appendChild(grid)
  } 
  
  
  function apiFetchCourse(table) {
    const id = readIdQueryParam()
    axios.get(`http://localhost:8080/courses/getCourseById/${id}`)
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
  }