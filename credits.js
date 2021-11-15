
const studentsArray = [
  
   "SaraMunir", "seanSip"
]
const teachersArray = [

    "colindamelio", "EstherEdell", "darshanasen", "adrianpearman", "davidallenjordan", "JoeyDeol", "lauraeasson", "zeinabkahera", "madifuller", "sebastianowen"   
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

renderStudent()

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
              <img src="${data.avatar_url}" alt="student picture of ${data.name !== null ? data.name : teacher}" class="creditPhoto">
              <p>${data.name !== null ? data.name : teacher}</p>
            </div>
          </div> 
        `
        teachers.appendChild(card)
      })
  });
}

renderTeachers()



const hamburgerMenu = document.querySelector('.hamburgerMenu');
const navMenu = document.querySelector('.navMenu');

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active2");
  navMenu.classList.toggle("active2");
})



