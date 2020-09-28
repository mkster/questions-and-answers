import React, { useEffect, useState } from 'react';
import { postAnswer, useAnswerBy, useAnswers } from '../APIHelper';
import useUserID from './../Util/useUserID';
import QuestionAnswerer from './QuestionAnswerer';
import QuestionAnswers from './QuestionAnswers';


//only show answerer, then reavel answrs once answered
export default function Question(props) {
  const userID = useUserID()
  const question = props.question;
  const [answers, setAnswers, fetchAnswers] = useAnswers(question._id);
  const [questionAnswered, setQuestionAnswered] = useQuestionAnswered(question._id, userID)

  function onQuestionAnswered(answer){
    const answerQuestionID = props.question._id
    console.log(answerQuestionID)
    postAnswer(answerQuestionID, answer, userID).then(addition => {
      //dont change stuff if a new question was already selected now
      if (answerQuestionID === props.question._id) {
        const error = addition.length === 0 //TODO handle error somehow? perhaps in root function though TOOD this is not error state always could also be empty, need to do that correctly
        if (!error) setAnswers([...answers, addition])
        setQuestionAnswered();
      }
    })
  }

  return (
    <div >
      <br/>
      <QuestionAnswerer questionID={question._id} questionTitle={question.question} questionAnswered={questionAnswered} onQuestionAnswered={onQuestionAnswered} onQuestionCompleted={props.onQuestionCompleted} />
      <br/>
      <QuestionAnswers questionAnswered={questionAnswered} answers={answers}/>
    </div>
  );
}


function useQuestionAnswered(questionID, userID){
  const [questionsAnswered, setQuestionsAnswered] = useState([]); 
  const [answer, setAnswer, updateAnswer] = useAnswerBy(questionID, userID)

  //new user reset table
  useEffect(() => {
    setQuestionsAnswered([])
  }, [userID])

  function setQuestionAnswered(){
    const copy = [...questionsAnswered]
    copy[questionID] = true;
    setQuestionsAnswered(copy)
  }

  const questionAnsweredDb = answer && answer.length !== 0
  const questionAnsweredLocal = questionsAnswered[questionID]
  const questionAnswered =  questionAnsweredLocal || questionAnsweredDb 

  return [questionAnswered, setQuestionAnswered]
}
