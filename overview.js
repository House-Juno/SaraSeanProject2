const app ={}

app.charactersArr = [
    {
        name: "Jon Snow",
        imgName: "Jon",
        id: 583
    },
    {
        name: "Sansa Stark",
        imgName: "Sansa",
        id: 957
    },
    {
        name: "Eddard \"Ned\" Stark",
        imgName: "Eddard",
        id: 339
    },
    {
        name: "Jaime Lannister",
        imgName: "Jaime",
        id: 529
    },
    {
        name: "Tyrion Lannister",
        imgName: "Tyrion",
        id:1052
    },
    {
        name: "Cersei Lannister",
        imgName: "Cersei",
        id:238
    },
    {
        name: "Joffrey Baratheon",
        imgName: "Joffrey",
        id:565
    },
    {
        name: "Aerys II Targaryen",
        imgName: "Aerys",
        id:62
    },
    {
        name: "Daenerys Targaryen",
        imgName: "Daenerys",
        id:271
    },
    {
        name: "Tywin Lannister",
        imgName: "Tywin",
        id:27
    },
    {
        name: "Ramsay Bolton",
        imgName: "Ramsay",
        id:849
    },
    {
        name: "Arya Stark"	,
        imgName: "Arya",
        id:148
    },
    {
        name: "Robert Baratheon",
        imgName: "Robert",
        id:901
    },
    {
        name: "Theon Greyjoy",
        imgName: "Theon",
        id:1022
    },
    {
        name: "Samwell Tarly",
        imgName: "Samwell",
        id:954
    },
    {
        name: "Lord Varys",
        imgName: "Lord",
        id:2069
    },
    {
        name: "Bran Stark",
        imgName: "Bran",
        id:208
    },
    {
        name: "Brienne of Tharth",
        imgName: "Brienne",
        id:216
    },
    {
        name: "Petyr Baelish",
        imgName: "Petyr",
        id:823
    },
    {
        name: "Tormund",
        imgName: "Tormund",
        id:2024
    },
    {
        name: "Melisandre",
        imgName: "Melisandre",
        id:743
    },
    {
        name: "Olenna Tyrell",
        imgName: "Olenna",
        id:784
    },
    {
        name: "Mance Rayder",
        imgName: "Mance",
        id:1666
    }
    ]
app.getCharacters=()=>{
    fetch(`https://game-of-thrones-quotes.herokuapp.com/v1/characters`)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        app.dataArray = [...data]
        app.dataArray2 = [...data]
        console.log(app.dataArray2)
        app.newArray = []
        app.dataArray2.forEach(character => {
            app.charactersArr.forEach(cc=>{
                if (cc.name === character.name){
                    let newObje = {...character}
                    // console.log('same name: ', cc.name+ ' ' + cc.id)
                    // console.log('snewObje ',newObje)
                    newObje.id = cc.id
                    newObje.imgName = cc.imgName

                    app.newArray.push(newObje)
                }
            })
        });
        console.log('new Array: ', app.newArray)
        app.renderArray(app.newArray)
    })

}
app.renderArray = (array)=>{
    const charactersArray= document.getElementById('charactersArray')
    array.forEach(arr=>{
        const card = document.createElement('div');
        card.className = "myCard"
        card.id = arr.id
        card.innerHTML = `
            <img src="./characterPics/${arr.imgName}.webp" alt="" class="characterimg">
            `
            // <p>${arr.name}</p>
        charactersArray.appendChild(card)
    })
}

app.init = ()=>{
    app.getCharacters()
}
app.init();