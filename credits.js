// getting data and creating the quiz on load
// const fetchUsers = async (user) => {
//   const api_call = await fetch (`https://api.github.com/users/USERNAME`)
// let avatar_url = () => {
//   fetch(`https://api.github.com/users/${avatar_url}`)
// }

const studentsArray = [
  
   "SaraMunir", "seanSip"
]
const teachersArray = [

    "colindamelio", "EstherEdell", "darshanasen", "adrianpearman", "davidallenjordan", "JoeyDeol"  
]

const renderStudent = () => {
  const students = document.getElementById("students")
  students.innerHTML = ""
  studentsArray.forEach(student => {
    fetch(`https://api.github.com/users/${student}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
        <div class="imgWrap">
              <img src="${data.avatar_url}" alt="student picture of ${data.name}" class="creditPhoto">
              <p>${data.name}</p>
            </div>
          </div> 
        `
        students.appendChild(card)
      })
  });
}

// renderStudent()

const renderTeachers = () => {
  teachersArray.forEach(teacher => {
    const teachers = document.getElementById("teachersContainer")
    teachers.innerHTML = ""
    fetch(`https://api.github.com/users/${teacher}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const card = document.createElement("div") 
        card.className = "card"
        card.innerHTML = `
        <div class="imgWrap">
              <img src="${data.avatar_url}" alt="student picture of ${data.name}" class="creditPhoto">
              <p>${data.name}</p>
            </div>
          </div> 
        `
        teachers.appendChild(card)
      })
  });
}

// renderTeachers()



const hamburgerMenu = document.querySelector('.hamburgerMenu');
const navMenu = document.querySelector('.navMenu');

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active2");
  navMenu.classList.toggle("active2");
})


// const creditPhoto = document.getElementById('creditPhoto');

  
//     fetch(`https://api.github.com/users/SeanSip`)
//       .then(res => res.json())
//       .then(data => {
//         creditPhoto = `<img src="${data.avatar_url}`
//       })
