import { use, useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'


function App() {
  // const cards = [
  //   {
  //     question: <Card text = "1 + 1"  color = "pink"/>,
  //     answer: <Card text = "2" color = "pink"/>,
  //     numericAnswer: 2
  //   },
  //   {
  //     question: <Card text = "2 * 2"  color = "blue"/>,
  //     answer: <Card text = "4" color = "blue"/>,
  //     numericAnswer: 4
  //   },
  //   {
  //     question: <Card text = "10 / 2"  color = "purple"/>,
  //     answer: <Card text = "5" color = "purple"/>,
  //     numericAnswer: 5
  //   },
  //   {
  //     question: <Card text = "24 - 2"  color = "green"/>,
  //     answer: <Card text = "22" color = "green"/>,
  //     numericAnswer: 22
  //   },
  //   {
  //     question: <Card text = "16 + 2"  color = "pink"/>,
  //     answer: <Card text = "18" color = "pink"/>,
  //     numericAnswer: 18
  //   }
  // ];

{/******converts the static array from above to state*************************************************************/}
    const [cardsList, setCardsList] = useState([
        {   question: <Card text = "1+1"  color = "pink"/>, 
            answer: <Card text = "2" color = "pink"/>,
            numericAnswer: 2 
        },
        {   question: <Card text = "2 * 2"  color = "blue"/>,
            answer: <Card text = "4"  color = "blue"/>,
            numericAnswer: 4
        },
        {   question: <Card text = "10 - 5"  color = "purple"/>,
            answer: <Card text = "5"  color = "purple"/>,
            numericAnswer: 5
        },
        {   question: <Card text = "4 * 4"  color = "blue"/>,
            answer: <Card text = "16"  color = "blue"/>,
            numericAnswer: 16
        },
        {question: <Card text = "24 + 2"  color = "pink"/>,
            answer: <Card text = "26"  color = "pink"/>,
            numericAnswer: 26
        }
    ]);
    
    {/**********************************************************************************
    will keep track of the current flashcard displayed with the useState hook.     */}
    const[currentCard, setCurrentCard] = useState(0); {/*index will start at 0 of the cardsList array*/}

    {/********************************************************************************
    will keep track of whether the card is flipped or not.**/}
    const [flip, setFlip] = useState(false);

    {/********************************************************************************
    functions for the next and previous buttons    **/}    
    const isAtStart = () => currentCard === 0;
    const isAtEnd = () => currentCard === cardsList.length - 1;
    const prevCard = () =>{
        
        if(!isAtStart()){
            setCurrentCard(currentCard - 1);    {/*will decrease the index of the cardsList array so that the previous card is displayed*/}
            setFlip(false);     {/* need to set to false everytime the back btn is clicked so that the previous card is the 'question' and not the 'answer' if flip is set to 'true' at time when btn is pressed*/}
            myInput.classList.remove("incorrect");
            myInput.classList.remove("correct"); 
            setAnswer(""); //clear input
        }
    }
    const nextCard = () =>{
        
        if (!isAtEnd()){
            setCurrentCard(currentCard + 1);    {/*will increase the index of the cardsList array so that the next card is displayed*/}
            setFlip(false);  {/* need to set to false everytime the next btn is clicked so that the next card is the 'question' and not the 'answer' if flip is set to 'true' at time when btn is pressed*/}
            myInput.classList.remove("incorrect");
            myInput.classList.remove("correct");
            setAnswer(""); //clear input
        }
    }
    
    {/******************************************************************************** 
    will set the win streak of correct answers in a row or set to 0 if incorrect answer entered */}
    const [inputAnswer, setAnswer] = useState("");
    const[winStreak, setWinStreak] = useState(0);
    const[longestStreak, setLongestStreak] = useState(0);
    const myInput = document.getElementById("myInput");
    const checkAnswer = () =>{
        if (inputAnswer == cardsList[currentCard].numericAnswer){
            setWinStreak(winStreak + 1);
            myInput.classList.remove("incorrect");
            myInput.classList.add("correct");
            if (winStreak > longestStreak){
                setLongestStreak(winStreak + 1);
            }
        }
        else if (inputAnswer != cardsList[currentCard].numericAnswer){
            setWinStreak(0);
            myInput.classList.remove("correct");
            myInput.classList.add("incorrect");
        }
        
        
    }
    const shuffleArray = () =>{
        const shuffled = [...cardsList]; //make a copy of cards so we dont change original
        for (let i = shuffled.length - 1; i > 0; i--) {//loops backward through array
            const j = Math.floor(Math.random() * (i + 1)); //random index from 0 to i
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; //swaps current item at i with the random one at j
        }
        return shuffled;
    }
    const shuffleCards = () => { //gets called when shuffle button is clicked
        const newDeck = shuffleArray(cardsList); //calls shufflleArray to shuffle cards
        setCardsList(newDeck);//Replaces old list with the shuffled one in React state.
        setCurrentCard(0);//Resets to first card in the shuffled list.
        setFlip(false);//card is showing the question
        myInput.classList.remove("incorrect");//removes style
        myInput.classList.remove("correct");//remives style
        setAnswer("");//clear answer input box
        setWinStreak(0); //reset win streak

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        checkAnswer();
    }
    {/*******************************************************************************/}
    
  return (
    <div>
        <h1>Math Flashcards</h1>
        <h2>Try solving these easy math problems</h2>
        <h2>Number of Cards: {cardsList.length}</h2>  
        <h2>Current Streak: {winStreak} &nbsp; Longest Streak: {longestStreak}</h2>

        <div className="card-container">
            <div onClick={() => setFlip(!flip)} className = "card">
                {flip ? cardsList[currentCard].answer: cardsList[currentCard].question }
            </div>
            <form id ="form" onSubmit = {handleSubmit}> 
                <input type = "text" id="myInput" placeholder='Enter Answer' value ={inputAnswer} onChange = {(event) => setAnswer(event.target.value)}/>
                <input type = "submit"/>
                <button type="button" onClick = {shuffleCards}>Shuffle</button>
            </form>
            <button disabled = {isAtStart()} onClick = {prevCard}>Back</button>
            <button disabled = {isAtEnd()} onClick = {nextCard}>Next</button>
        </div>
       </div>     
    
  )
}

export default App;
