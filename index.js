const app = {};
app.userScore = 0;
app.correctChoice = 0;
app.incorrectChoice = 0;
app.questionArray = [];
app.startButton = document.querySelector('#playButton');

app.houses =[
    "Stark", "Targaryen", "Tyrell", "Baratheon", "Lannister", "Bolton", "Greyjoy", "Martell"
]
app.startButton.addEventListener('click', ()=>{app.scrollToHome()})
app.scrollToHome=()=>{
    app.houseSection = document.querySelector('.houses')
    app.houseBannerSect = document.querySelector('.houseBannerSect');
    app.houseBannerSect.style.display = 'flex';
    setTimeout(() => {
        app.houseBannerSect.scrollIntoView({behavior: 'smooth'});
        app.houses.forEach(house=>{
            const img = document.createElement('img');
            img.src = `./assets/houses/${house}.png`;
            img.id = house;
            img.alt =`house ${house} banner`;
            img.addEventListener('click', app.selectHome)
            app.houseSection.appendChild(img)
        })
    }, 100);
}
app.selectHome = (e)=>{
    console.log(e.target.id);
    app.userHouse = e.target.id;
    app.startGame();
}

app.inputEnter = document.getElementById("username");
app.inputEnter.onkeydown= (e)=>{
    if (e.keyCode === 13){
        e.preventDefault()
        app.scrollToHome()
    } 
}
// app.startButton.addEventListener('click', app.startGame)
app.startGame = ()=>{
    console.log('starting game')
    app.userName = document.querySelector('input').value

    app.startButton.className='hidden';
    const quizSection = document.getElementById('quizSection');

    
    quizSection.style.display='block';

    setTimeout(() => {
        quizSection.scrollIntoView({behavior: 'smooth'});
    }, 100);
    
    
    // app.getData()
    // console.log('wait:', app.questionArray)
    app.houseBannerSect.style.display = 'none';

    quizSection.innerHTML = `
    <div class="wrapper quizHide">
        <div class="usernameContainer">
            <img class="bannerLogo" src='./assets/houses/${app.userHouse}.png' alt='${app.userHouse} house banner'/>
            <p id="usernameOutput">${app.userName}</p>
        </div>
        <p id="quizNumber"></p>
        <div class="quote">

        </div>
        <div class="quizContainer">
        </div>
    </div>
`
const quizHIder = document.querySelector('.quizHide');
quizHIder.style.visibility= 'visible'
    setTimeout(() => {
        app.renderQuestion(quizSection);
        
    }, 100);
}
// getting data and creating the quiz on load
app.getData = ()=>{

    fetch(`https://game-of-thrones-quotes.herokuapp.com/v1/characters`)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        app.dataArray = [...data]
        app.dataArray2 = [...data]
        app.createQuiz(app.dataArray2);
    })
}
app.createQuiz=(data)=>{
    // console.log('data: ', data)
    let charactersArr= data;
    let gettingArr = app.createQuestionsArray(charactersArr);
    for(l=1; l<=5; l++){
        app.createQuestionsArray(gettingArr)
    }
}
app.createQuestionsArray=(charactersArr)=>{
    const selectedQuestion = {};
    // shufling the array randomly. n
    app.shuffle(charactersArr)
    let filteringArray = charactersArr.filter(char=>{
        if (char.quotes.length !== 0){
            return char
        }
    })
    // getting the first choice as selected 
    if(filteringArray[0].quotes.length>0){
        // console.log('charactersArr[0].quotes.length', filteringArray[0].quotes.length)
        // console.log('charactersArr[0].quotes.length', filteringArray[0])
        app.selectQuestion(filteringArray, selectedQuestion);
        return filteringArray;
    } else if (filteringArray[0].quotes.length == 0){
        // console.log('charactersArr[0].quotes.length', filteringArray[0].quotes.length)
        // if no quote is left remove the character from the list
        // console.log('characters: ', filteringArray[0])
        filteringArray.splice(0, 1);
        // console.log('charactersArr after splice: ', filteringArray)

        // shuffle the array after removing
        app.shuffle(filteringArray);
        app.selectQuestion(filteringArray, selectedQuestion)
        return charactersArr;
    }
}
app.selectQuestion = (charactersArr, selectedQuestion)=>{
    const randomQuote = Math.floor(Math.random() * charactersArr[0].quotes.length)
    // selecting the first character in the array 
    selectedQuestion.randomCharacter = charactersArr[0].name;
    // selecting a random quote from the selected character's quote array 
    selectedQuestion.randomQuote = charactersArr[0].quotes[randomQuote];
    // creating an empty array for the multiple choices;
    selectedQuestion.choices = []
    // running the loop so that we can get first four character for the including the correct answer for multiple choice and then push it in to the choice array
    for (i=0;i<4;i++){
        selectedQuestion.choices.push(charactersArr[i].name)
    }
    // randomize the created choices array
    app.shuffle(selectedQuestion.choices)
    // remove the selected quote from the array so it is not repeated later in the quiz
    let quotesIndx= charactersArr[0].quotes.indexOf(charactersArr[0].quotes[randomQuote])
    charactersArr[0].quotes.splice(quotesIndx, 1)

    // pushing the created object to the questions array. 
    app.questionArray.push(selectedQuestion);
}
app.shuffle = (a)=> {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
// render questions
app.index = 0;
app.score = 0;
app.startOver = false;
app.renderQuestion=()=>{
    const quizContainer = document.querySelector('.quizContainer');
    quizContainer.innerHTML = '';
    const quoteContainer = document.querySelector('.quote');
    quoteContainer.innerHTML=``
    setTimeout(() => {
        quoteContainer.innerHTML = `
            <p><span>Who Said: </span></p>
            <div>
                <p id="quote"></p>
            </div>
        `
        const quote = document.getElementById('quote');
        const quizNumber = document.querySelector('#quizNumber');
        quote.innerHTML = ''
        // console.log(app.index )
        // console.log(app.questionArray.length)
        if(app.index < app.questionArray.length && app.startOver== false){
            quizNumber.innerHTML = `${app.index + 1} <span> out of </span> ${app.questionArray.length}`

            const quiz = app.questionArray[app.index]
            const {randomQuote, randomCharacter, choices} = quiz
            quote.textContent = `"${randomQuote}"`;
            app.currentAnswer = randomCharacter
    
            const characterChoiceContainer = document.createElement('div');
    
            characterChoiceContainer.className = 'characterChoiceContainer'
            quizContainer.appendChild(characterChoiceContainer);
            choices.forEach(choice => {
                const card = document.createElement('div');
                const cardTop = document.createElement('div');
                cardTop.className ='cardTop'
                card.appendChild(cardTop)
                card.addEventListener('click', app.selectChoice)
                card.className = 'card';
                card.dataset.selected = choice;
                cardTop.dataset.selected = choice;
                cardTop.id = choice;
                const imgWrap = document.createElement('div');
                imgWrap.className = 'imgWrap';
                imgWrap.dataset.selected = choice;
                const image = document.createElement('img');
                image.className ='characterimg';
                image.dataset.selected = choice
                const imgSrcArray = choice.split(" ");
                image.src = `characterPics/${imgSrcArray[0]}.webp`
                const p = document.createElement('p');
                p.textContent = choice;
                imgWrap.appendChild(image);
                imgWrap.appendChild(p);
                card.appendChild(imgWrap)
                characterChoiceContainer.appendChild(card);
            });

            app.index = app.index + 1
        } else {
            app.startOver= true
            const quizSection = document.getElementById('quizSection')
            quizSection.style.display='flex';
            if(app.correctChoice === app.questionArray.length && app.incorrectChoice === 0){
                quoteContainer.innerHTML=`
                <div class="quizScoreBoard">
                    <div id="quote">
                        <h3><span class="endingUserName">${app.userName}</span> of House ${app.userHouse}</h3>
                        <p>Quiz Complete!</p>
                        <p>Your score : ${app.userScore}</p>
                        <p>You got ${app.correctChoice} correct</p>
                        <p>and ${app.incorrectChoice} incorrect</p>
                        <img src="https://c.tenor.com/xHg7HK_ziuoAAAAC/clapping-leonardo-dicaprio.gif"/>
                    </div>
                </div>
                `
            }
            else if(app.correctChoice === 0 && app.incorrectChoice === app.questionArray.length){
                quoteContainer.innerHTML=`
                <div class="quizScoreBoard">
                    <div id="quote">
                    <h3><span class="endingUserName">${app.userName}</span> of House ${app.userHouse}</h3>
                    <p>Quiz Complete!</p>
                        <p>Your score : ${app.userScore}</p>
                        <p>You got ${app.correctChoice} correct</p>
                        <p>and ${app.incorrectChoice} incorrect</p>
                        <img src="https://c.tenor.com/LfIIksaESfIAAAAC/you-can.gif"/>
                    </div>
                </div>
                `
            }
            else {
                quoteContainer.innerHTML=`
                <div class="quizScoreBoard">
                    <div id="quote">
                    <h3><span class="endingUserName">${app.userName}</span> of House ${app.userHouse}</h3>
                    <p>Quiz Complete!</p>
                        <p>Your score : ${app.userScore}</p>
                        <p>You got ${app.correctChoice} correct</p>
                        <p>and ${app.incorrectChoice} incorrect</p>
                    </div>
                </div>
                `
            }
            const restartBtn = document.createElement('button')
            restartBtn.className = 'restartButton';
            restartBtn.textContent = 'play again';
            quoteContainer.appendChild(restartBtn)
            restartBtn.addEventListener('click', ()=>{app.restartGame()})
            const buttonsCntr = document.createElement('div')
            buttonsCntr.className="buttonContainer"

            const creditBtn = document.createElement('a');
            const historyBtn = document.createElement('a');
            
            historyBtn.innerHTML='Characters'
            historyBtn.href='./characters.html'
            creditBtn.innerHTML='Credits'
            creditBtn.href='./credits.html'

            buttonsCntr.appendChild(historyBtn)
            buttonsCntr.appendChild(creditBtn)

            quoteContainer.appendChild(buttonsCntr)
        }
    }, 100);
}
app.restartGame = ()=>{
        app.startOver = false;
        app.userScore = 0;
        app.correctChoice = 0;
        app.incorrectChoice = 0;
        app.questionArray = [];
        app.index = 0;
        app.score = 0;
        const quizSection = document.getElementById('quizSection')
        quizSection.style.display='block';

        const newArr = [...app.dataArray]
        app.createQuiz(newArr)
        
        const quizContainer = document.querySelector('.quizContainer');
        quizContainer.innerHTML = '';
        app.renderQuestion()
}
app.selectChoice = (e)=>{
    const quizContainer = document.querySelector('.quizContainer');
    const nextBtn = document.createElement('button');
    const nextBtnArrow = document.createElement('button');
    nextBtn.className = 'nextButton';
    nextBtn.textContent = "Next";
    nextBtnArrow.className = 'nextBtnMedia';
    nextBtnArrow.innerHTML = '<i class="fas fa-chevron-right"></i>'

    nextBtnArrow.addEventListener('click', app.renderQuestion)
    nextBtn.addEventListener('click', app.renderQuestion)
    quizContainer.appendChild(nextBtn)
    quizContainer.appendChild(nextBtnArrow)
    
    // check if answer is correct or not: 
    // if correct
    // console.log('e: ', e.target.id)
    if (e.target.dataset.selected === app.currentAnswer){
        // console.log('correct')
        app.correctChoice = app.correctChoice  + 1;

        app.userScore = app.userScore + 10
        e.target.className = 'cardTop correct';
        const allCards = document.querySelectorAll('.card');
        // console.log('why not showing?')
        // console.log('allCard:', allCards);
        const newArr = []
        allCards.forEach(card=>{
            
            card.removeEventListener('click', app.selectChoice);
            card.addEventListener('click', app.renderQuestion);
            if (app.currentAnswer !== card.attributes['data-selected'].value){
                newArr.push(card) 
            } else {
                card.style.transform = "scale(1.1)"
                card.style.zIndex = 20;

            }
        })
        newArr.forEach(card=>{
            card.childNodes[0].className = 'cardTop incorrectTop'
        })
    }else {

// if incorrect

        app.userScore = app.userScore - 10
        app.incorrectChoice = app.incorrectChoice + 1;

        const correctDiv = document.getElementById(`${app.currentAnswer}`);
        correctDiv.className = 'cardTop correct';
        const allCards = document.querySelectorAll('.card');
        const newArr = []
        allCards.forEach(card=>{
            card.removeEventListener('click', app.selectChoice);
            card.addEventListener('click', app.renderQuestion);
            if (app.currentAnswer !==card.attributes['data-selected'].value){
                newArr.push(card) 
            } else {
                card.style.transform = "scale(1.1)"
                card.style.zIndex = 20;
            }
        })
        newArr.forEach(card=>{
            card.childNodes[0].className = 'cardTop incorrectTop'
        })
        e.target.className = 'cardTop incorrect incorrectTop'; 
    }
}

app.init = ()=>{
    app.getData();
}
app.init()