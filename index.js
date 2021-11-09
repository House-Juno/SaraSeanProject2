const app = {};
app.userScore = 0;
app.questionArray = [];
app.startButton = document.querySelector('#playButton');

app.startButton.addEventListener('click', function(){
    console.log('play button clicked')
    app.startButton.className='hidden'
    // app.getData()
    // console.log('wait:', app.questionArray)
    app.renderQuestion()
})
// getting data and creating the quiz on load
app.getData = ()=>{
    fetch(`https://game-of-thrones-quotes.herokuapp.com/v1/characters`)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        app.createQuiz(data);
        app.dataArray = [...data]
    })
}
app.createQuiz=(data)=>{
    // console.log('data: ', data)
    let charactersArr= data;
    let gettingArr = app.createQuestionsArray(charactersArr);
    for(l=1; l<=4; l++){
        app.createQuestionsArray(gettingArr)
    }
    // setTimeout(() => {
    //     app.printOutFirst(app.questionArray)
    // }, 300);
}
app.createQuestionsArray=(charactersArr)=>{
    const selectedQuestion = {};
    // shufling the array randomly. n
    app.shuffle(charactersArr)
    
    // getting the first choice as selected 
    if(charactersArr[0].quotes.length>0){
        app.selectQuestion(charactersArr, selectedQuestion);

        return charactersArr;
    }else {
        // if no quote is left remove the character from the list
        charactersArr.splice(0, 1);

        // shuffle the array after removing
        app.shuffle(charactersArr);
        app.selectQuestion(charactersArr, selectedQuestion)
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
app.renderQuestion=()=>{

    const quizContainer = document.querySelector('.quizContainer');
    quizContainer.innerHTML = '';
    const quote = document.querySelector('#quote');
    if(app.index < app.questionArray.length){
        console.log('rendering')
        // console.log(app.questionArray[app.index])
        // console.log(app.questionArray[app.index].randomQuote);
        console.log(quote)
        const quiz = app.questionArray[app.index]
        const {randomQuote, randomCharacter, choices} = quiz
        // console.log('randomQuote: ', randomQuote)
        // console.log('randomCharacter: ', randomCharacter)
        // console.log('choices: ', choices)
        quote.textContent = randomQuote;
        app.currentAnswer = randomCharacter
    
        // render the options
        // call the cards container. 
        const characterChoiceContainer = document.createElement('div');
        characterChoiceContainer.className = 'characterChoiceContainer'
        quizContainer.appendChild(characterChoiceContainer);
        // characterChoiceContainer.innerHTML = ''
        // create the cards from the array of choices. 
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
            imgWrap.dataset.selected = choice
            // imgWrap.id = choice
            const image = document.createElement('img');
            image.className ='characterimg';
            image.dataset.selected = choice
            const imgSrcArray = choice.split(" ");
            // console.log('img name: ', imgSrcArray[0])
            image.src = `characterPics/${imgSrcArray[0]}.webp`
            const p = document.createElement('p');
            p.textContent = choice;
            imgWrap.appendChild(image);
            imgWrap.appendChild(p);
            card.appendChild(imgWrap)
            characterChoiceContainer.appendChild(card);
        });
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nextButton';
        nextBtn.textContent = "Next"
        nextBtn.addEventListener('click', app.renderQuestion)
        console.log('index: ', app.index)
        console.log('index: ', app.questionArray.length)
        app.index = app.index + 1
        quizContainer.appendChild(nextBtn)
    } else {
        quote.textContent = 'your score';
        quizContainer.innerHTML="<h3> Quiz completed!!</h3>"
    }
}
app.selectChoice = (e)=>{

    // check if answer is correct or not: 
    
    console.log('e: ', e.target.id)
    if (e.target.dataset.selected === app.currentAnswer){
        console.log('correct')
        e.target.className = 'cardTop correct'
    }else {
        console.log('wrong')
        console.log('app.currentAnswer', app.currentAnswer)
        e.target.className = 'cardTop incorrect'; 
        const correctDiv = document.getElementById(`${app.currentAnswer}`);
        correctDiv.className = 'cardTop correct'
        const 
    }
}

app.init = ()=>{
    console.log('welcome to our app!');
    app.getData()
}
app.init()