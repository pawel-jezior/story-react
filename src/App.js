import { useEffect, useState } from "react";
// import {
//   fetchWrongAnswersToQuestions,
//   fetchCorrectAnswerToQuestions,
// } from "./fetchData/anwersToQuestions";
import { fetchBot } from "./fetchData/bot";
import { fetchQuestionsWithAnswers } from "./fetchData/questions";
import { fetchStory } from "./fetchData/story";

function App() {
  const db =
    "https://game-react-2e9ab-default-rtdb.europe-west1.firebasedatabase.app/";
  const fetchSuffix = ".json";
  const bot = "bot";
  const questions = "questions";
  const story = "story";
  const content = "content";
  const correct = "correct";
  const wrong = "wrong";

  const [botData, setBotData] = useState()
  const [currentBot, setCurrentBot] = useState()
  const [botNumber, setBotNumber] = useState()

  const [questionsData, setQuestionsData] = useState()
  const [currentQuestion, setCurrentQuestion] = useState()
  const [questionNumber, setQuestionNumber] = useState()

  const [currentWrongAnswer1, setCurrentWrongAnswer1] = useState()
  const [currentWrongAnswer2, setCurrentWrongAnswer2] = useState()
  const [currentWrongAnswer3, setCurrentWrongAnswer3] = useState()
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState()

  const [storyData, setStoryData] = useState()
  const [currentStory, setCurrentStory] = useState()
  const [storyNumber, setStoryNumber] = useState()
  //zrobic mape, z true false 
  // const [displayedStory, setDisplayedStory] = useState(new Map([1,'false'],[2,'false']))

  const [submitButtonName, setSubmitButtonName] = useState("START")

  // console.log(displayedStory.get(1))
  //==============================================================================
  const getBotData = async () => {
    await fetch(db + bot + fetchSuffix)
    .then((response) => response.json())
    .then((response) => {
      setBotData(response)
    })
    .catch((error) => {
      console.log("The content of the BOT cannot be downloaded.", error);
    });
  }
  //==============================================================================
  const getQuestionsData = async () => {
    await fetch(db + questions + fetchSuffix)
    .then((response) => response.json())
    .then((response) => {
      setQuestionsData(response)
    })
    .catch((error) => {
      console.log("The content of the QUESTIONS cannot be downloaded.", error);
    });
  }
  //==============================================================================
  const getStoryData = async () => {
    await fetch(db + story + fetchSuffix)
    .then((response) => response.json())
    .then((response) => {
      setStoryData(response)
    })
    .catch((error) => {
      console.log("The content of the STORY cannot be downloaded.", error);
    });
  }
  //==============================================================================
  useEffect(() => {
    getBotData()
    getQuestionsData()
    getStoryData()
  },[])

  useEffect(() => {
    (botNumber >= 0) ? setCurrentBot(botData[botNumber].content) : setCurrentBot("Press START")
  },[botNumber])

  useEffect(() => {
    if (questionNumber >= 0) {
      setCurrentQuestion(questionsData[questionNumber].content)

      setCurrentWrongAnswer1(questionsData[questionNumber].wrong1)
      setCurrentWrongAnswer2(questionsData[questionNumber].wrong2)
      setCurrentWrongAnswer3(questionsData[questionNumber].wrong3)

      setCurrentCorrectAnswer(questionsData[questionNumber].correct)
    }
  },[questionNumber])

  useEffect(() => {
    if (storyNumber >= 0) setCurrentStory(storyData[storyNumber].content)
  }, [storyNumber])

  useEffect(() => {

  },[])
  
  const check = () => {
    if (submitButtonName !== "SUBMIT") {
      setSubmitButtonName("SUBMIT")
      setBotNumber(0)
      setQuestionNumber(0)
      showRadioButtons()
    }

    if (document.querySelector('#correctAnswer').checked){
      setStoryNumber(0)

      if (questionNumber < 9) setQuestionNumber(questionNumber + 1)
      if (botNumber < 11) setBotNumber(botNumber + 1)

      

    } else if (document.querySelector('#wrongAnswer1').checked
            || document.querySelector('#wrongAnswer2').checked
            || document.querySelector('#wrongAnswer3').checked) {

            }
    uncheckRadioButtons()
  }

  const uncheckRadioButtons = () => {
    Array.from(document.querySelectorAll('input[name="answer"]:checked'), input => input.checked = false)
  }

  const showRadioButtons = () => {
    Array.from(document.querySelectorAll('input[name="answer"]'), input => input.style.display = 'inline')
  }



  return (
    <div className="app">
      <div className="app__chat">
        <h3>{currentBot}</h3>
      </div>
      <div className="app__question">
        <h3>{currentQuestion}</h3>
      </div>
       <div className="app__chat--buttons">
        <input className="app__chat--buttons-radioButton" type="radio" value={currentWrongAnswer1} name="answer" id="wrongAnswer1"/>{currentWrongAnswer1}
        <input className="app__chat--buttons-radioButton" type="radio" value={currentWrongAnswer2} name="answer" id="wrongAnswer2"/>{currentWrongAnswer2}
        <input className="app__chat--buttons-radioButton" type="radio" value={currentWrongAnswer3} name="answer" id="wrongAnswer3"/>{currentWrongAnswer3}
        <input className="app__chat--buttons-radioButton" type="radio" value={currentCorrectAnswer} name="answer" id="correctAnswer"/>{currentCorrectAnswer}

        <button onClick={() => {check();}}>{submitButtonName}</button>
      </div>
      <div className="app__story">
        <h3>{currentStory}</h3>
      </div>
    </div>
  );
}

export default App;
