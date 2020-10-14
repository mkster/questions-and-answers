import React, { useEffect, useState } from 'react';
import { postAnswer, useAnswerBy, useAnswers } from '../util/apiHelper';
import useUserID from '../util/useUserID';
import QuestionAnswerer from './QuestionAnswerer';
import QuestionAnswers from './QuestionAnswers';
import SpaceFullWidth from './SpaceFullWidth';


//only show answerer, then reavel answrs once answered
export default function Question(props) {
  const userID = useUserID()
  const question = props.question;
  const [answers, setAnswers, ] = useAnswers(question._id);
  const [questionAnswered, setQuestionAnswered] = useQuestionAnswered(question._id, userID)

  function onQuestionAnswered(answer){
    const answerQuestionID = props.question._id
    postAnswer(answerQuestionID, answer, userID).then(addition => {
      //dont change stuff if a new question was already selected now
      if (answerQuestionID === props.question._id) {
        const error = addition === null
        if (!error) setAnswers([...answers, addition])
        setQuestionAnswered();
      }
    })
  }

  return (
    <>
      <SpaceFullWidth size={"large"} direction="vertical">
        <QuestionAnswerer questionID={question._id} questionTitle={question.question} questionAnswered={questionAnswered} onQuestionAnswered={onQuestionAnswered} onQuestionCompleted={props.onQuestionCompleted} />
        <QuestionAnswers questionAnswered={questionAnswered} answers={answers}/>
      </SpaceFullWidth>
    </>
  );
}


function useQuestionAnswered(questionID, userID){
  const [questionsAnswered, setQuestionsAnswered] = useState([]); 
  const [answer, , ] = useAnswerBy(questionID, userID)

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
