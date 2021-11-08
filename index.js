const app = {};
app.userScore = 0;
app.questionArray = [];
app.startButton = document.querySelector('#playButton');

app.startButton.addEventListener('click', function(){
    app.startButton.className='hidden'
    app.getData()
})

app.getData = ()=>{
    fetch(`https://game-of-thrones-quotes.herokuapp.com/v1/characters`)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        app.createQuiz(data);
    })
}
app.createQuiz=(data)=>{
    console.log('data: ', data)
    
}

app.init = ()=>{
    console.log('welcome to our app!')
}
app.init()