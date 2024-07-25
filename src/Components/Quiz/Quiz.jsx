import React, { useState } from 'react';
import './quiz.css';
import { data } from '../../data';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  //for checking last question or not
  const [isLastPage, setIsLastPage] = useState(false);
  //for getting score
  const [score, setScore] = useState(0);
  //to lock the answer when clicked so that it doesn't count when option is clicked multiple times

  const [lock, setLock] = useState(false);

  function resetOptionColors() 
  {
    const options = document.querySelectorAll('li');
    options.forEach(option => {
      option.classList.remove('correct', 'incorrect');
    });
  }

  function nextQuestion() {
    setLock(false);
    resetOptionColors();
    //not last question
    if (index < data.length - 1) {
      setIndex(index + 1);
      setQuestion(data[index + 1]);
    } 
    //last question
    else {
      setIsLastPage(true);
    }
  }

  if (isLastPage) {
    return (
      <>
        <h1>Quiz finished!</h1>
        <h2> Congrats, Your Score is : {score} </h2>
      </>
    );
  }
//To check whether the  answer is correct or not and to give the score

  function checkAnswer(e, ans) {
    if (!lock) {
      //if answer is correct then score is increased by 1

      if (ans === question.ans) {
        setScore(score + 1);
        e.target.classList.add('correct');
      } else {
        e.target.classList.add('incorrect');
        const correctOption = document.querySelector(`[data-answer='${question.ans}']`);
        correctOption.classList.add('correct');
      }
      setLock(true);
    }
  }

  return (
    <div className='quiz'>
      <h1>Kod Quiz</h1>
      <h3>{question.question}</h3>
      <ul>
        <li data-answer='1' onClick={(e) => { checkAnswer(e, '1'); }}>{question.Option1}</li>
        <li data-answer='2' onClick={(e) => { checkAnswer(e, '2'); }}>{question.Option2}</li>
        <li data-answer='3' onClick={(e) => { checkAnswer(e, '3'); }}>{question.Option3}</li>
        <li data-answer='4' onClick={(e) => { checkAnswer(e, '4'); }}>{question.Option4}</li>
      </ul>
      <button onClick={nextQuestion}>NEXT</button>
      <br></br>
      <div>Question : {index + 1} of {data.length}</div>
    </div>
  );
}
