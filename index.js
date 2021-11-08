const app = {};
app.userScore = 0;
app.questionArray = [];
app.startButton = document.querySelector('#playButton');

app.startButton.addEventListener('click', function(){
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
app.index = 0
app.renderQuestion=()=>{
    console.log('rendering')
    console.log(    app.questionArray[app.index].randomCharacter
        )
        const
}



app.init = ()=>{
    console.log('welcome to our app!');
    app.getData()
}
app.init()