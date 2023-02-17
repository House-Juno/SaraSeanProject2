const app = {};

// the api did not include enough information. so we are joing two api's together. the second api only pulled characters based on id. so we had to go into the documentaion to find out which ids the characters belonged to.
app.charactersArr = [
  {
    name: "Jon Snow",
    imgName: "Jon",
    id: 583,
  },
  {
    name: "Sansa Stark",
    imgName: "Sansa",
    id: 957,
  },
  {
    name: 'Eddard "Ned" Stark',
    imgName: "Eddard",
    id: 339,
  },
  {
    name: "Jaime Lannister",
    imgName: "Jaime",
    id: 529,
  },
  {
    name: "Tyrion Lannister",
    imgName: "Tyrion",
    id: 1052,
  },
  {
    name: "Cersei Lannister",
    imgName: "Cersei",
    id: 238,
  },
  {
    name: "Joffrey Baratheon",
    imgName: "Joffrey",
    id: 565,
  },
  {
    name: "Aerys II Targaryen",
    imgName: "Aerys",
    id: 62,
  },
  {
    name: "Daenerys Targaryen",
    imgName: "Daenerys",
    id: 271,
  },
  {
    name: "Tywin Lannister",
    imgName: "Tywin",
    id: 27,
  },
  {
    name: "Ramsay Bolton",
    imgName: "Ramsay",
    id: 849,
  },
  {
    name: "Arya Stark",
    imgName: "Arya",
    id: 148,
  },
  {
    name: "Robert Baratheon",
    imgName: "Robert",
    id: 901,
  },
  {
    name: "Theon Greyjoy",
    imgName: "Theon",
    id: 1022,
  },
  {
    name: "Samwell Tarly",
    imgName: "Samwell",
    id: 954,
  },
  {
    name: "Lord Varys",
    imgName: "Lord",
    id: 2069,
  },
  {
    name: "Bran Stark",
    imgName: "Bran",
    id: 208,
  },
  {
    name: "Brienne of Tharth",
    imgName: "Brienne",
    id: 216,
  },
  {
    name: "Petyr Baelish",
    imgName: "Petyr",
    id: 823,
  },
  {
    name: "Tormund",
    imgName: "Tormund",
    id: 2024,
  },
  {
    name: "Melisandre",
    imgName: "Melisandre",
    id: 743,
  },
  {
    name: "Olenna Tyrell",
    imgName: "Olenna",
    id: 784,
  },
  {
    name: "Mance Rayder",
    imgName: "Mance",
    id: 1666,
  },
  {
    name: "Ygritte",
    imgName: "Ygritte",
    id: 2126,
  },
  {
    name: "Catelyn Stark",
    imgName: "Catelyn",
    id: 232,
  },
  {
    name: "Aemon Targaryen",
    imgName: "Aemon",
    id: 54,
  },
];

// first get all the characters featured in the quiz app
app.getCharacters = () => {
  fetch(`https://api.gameofthronesquotes.xyz/v1/characters`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      app.dataArray = [...data];
      app.dataArray2 = [...data];
      app.newArray = [];
      app.dataArray2.forEach((character) => {
        app.charactersArr.forEach((cc) => {
          if (cc.name === character.name) {
            // combining the two arrays together to provide ids to call
            let newObject = { ...character };
            newObject.id = cc.id;
            newObject.imgName = cc.imgName;
            app.newArray.push(newObject);
          }
        });
      });
      app.renderArray(app.newArray);
    });
};
app.renderArray = (array) => {
  const charactersArray = document.getElementById("charactersArray");
  charactersArray.innerHTML = "";
  array.forEach((arr) => {
    let object;
    // some of the characters is missing the house key
    if (arr.house) {
      object = {
        id: arr.id,
        imgName: arr.imgName,
        quotes: arr.quotes,
        house: arr.house.name,
      };
    } else {
      object = {
        id: arr.id,
        imgName: arr.imgName,
        quotes: arr.quotes,
        house: "Unknown",
      };
    }
    // pringting out all the characters in the dom
    const card = document.createElement("div");
    card.className = "myCard";
    card.id = arr.id;
    card.innerHTML = `
            <div class="cardTop">
                <p>Click to view more about</p>
                <p class="tagName">${arr.name}</p>
            </div>
            <img src="./characterPics/${arr.imgName}.webp" alt="" class="characterimg">
            `;
    charactersArray.appendChild(card);
    card.addEventListener("click", () => {
      app.selectCard(object);
    });
  });
};
app.selectCard = (object) => {
  fetch(`https://anapioficeandfire.com/api/characters/${object.id}`)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      app.renderProfile(data, object);
    });
};
app.renderProfile = (data, object) => {
  const profileModalWindow = document.querySelector(".profileModalWindow");
  profileModalWindow.style.height = "100vh";
  const profileModal = document.createElement("div");
  const characterDetail = document.createElement("div");
  characterDetail.className = "characterDetail";
  profileModal.className = "profileModal";
  profileModal.innerHTML = `
    <img src="./characterPics/${object.imgName}.webp" alt="">
    `;
  characterDetail.innerHTML = `
        <div >
            <i class="fas fa-times" onclick='app.myFunction()'></i>
        </div>
        <h3>${data.name}</h3>
        <p><span>House:</span> ${object.house ? object.house : "Unknown"}</p>
        <p><span>Born:</span> ${data.born ? data.born : "Unknown"}</p>
        <p><span>Gender:</span> ${data.gender ? data.gender : "Unknown"}</p>
        <p><span>Titles:</span> ${data.titles.join(", ")}</p>
        <p><span>Aliases:</span> ${data.aliases.join(", ")}</p>
        <p><span>Quotes:</span></p>
    `;

  const ul = document.createElement("ul");
  object.quotes.forEach((quote) => {
    const li = document.createElement("li");
    li.textContent = quote;
    ul.appendChild(li);
  });
  characterDetail.appendChild(ul);

  profileModal.appendChild(characterDetail);
  const bodyHistory = document.querySelector(".historyPage");
  profileModalWindow.appendChild(profileModal);
  bodyHistory.appendChild(profileModalWindow);
};
app.myFunction = () => {
  const profileModalWindow = document.querySelector(".profileModalWindow");
  profileModalWindow.innerHTML = "";
  profileModalWindow.style.height = 0;
};
app.sortArray = (type) => {
  if (type === "AtoZ") {
    app.newArray.sort(function (a, b) {
      // a < b ? 1 : -1
      return a.name > b.name ? 1 : -1;
    });
    app.renderArray(app.newArray);
  }
  if (type === "ZtoA") {
    app.newArray.sort(function (a, b) {
      return b.name < a.name ? -1 : 1;
    });
    app.renderArray(app.newArray);
  }
  if (type === "house") {
    //  same of the elements does not contain hourse
    const filteredArr = app.newArray.filter((arr) => {
      return arr.house !== null;
    });

    filteredArr.sort(function (a, b) {
      return a.house.name > b.house.name ? 1 : -1;
    });
    app.renderArray(filteredArr);
  }
};

app.init = () => {
  app.getCharacters();
};
app.hamburgerMenu = document.querySelector(".hamburgerMenu");
app.navMenu = document.querySelector(".navMenu");

app.hamburgerMenu.addEventListener("click", () => {
  app.hamburgerMenu.classList.toggle("active2");
  app.navMenu.classList.toggle("active2");
});
app.init();
