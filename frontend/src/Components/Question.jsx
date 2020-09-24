import React, { useEffect, useState } from 'react';
import { postAnswer, useAnswers } from '../APIHelper';
import CardTitle from './CardTitle';
import QuestionAnswerer from './QuestionAnswerer';


//only show answerer, then reavel answrs once answered
export default function Question(props) {
  const userID = 1 //TODO use context?
  const question = props.question;
  const [answers, setAnswers, fetchAnswers] = useAnswers(question._id, null);
  const [questionAnswered, setQuestionAnswered] = useQuestionAnswered(question._id, userID)

  function onQuestionAnswered(answer){
    const answerQuestionID = props.question._id
    console.log(answerQuestionID)
    postAnswer(answerQuestionID, answer).then(addition => {
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

function QuestionAnswers(props){
  //const n = props.answers === null ? "_" : props.answers.length;
  //const title = `Answer to see ${n} Answers`
  return(
    <div>
      {!props.questionAnswered ? 
        <CardTitle title={`Answer to see Answers`} />
      :
        <CardTitle title={"Answers"} >
          {props.answers ? props.answers.map(a =>
            <p key={a._id}>{a.answer}</p>
          ): null}
        </CardTitle>
      }
    </div>
  )
}


//TODO will fetch is answered from backend, also need to push that
function useQuestionAnswered(questionID, userID){
  const [questionsAnswered, setQuestionsAnswered] = useState([]); 
  
  useEffect(()=>{
    //TODO fetch questions answered
    setQuestionsAnswered([])
  }, [userID])
  
  function setQuestionAnswered(){
    const copy = [...questionsAnswered]
    copy[questionID] = true;
    setQuestionsAnswered(copy)
  }
  const questionAnswered = questionsAnswered[questionID]
  
  return [questionAnswered, setQuestionAnswered]
}
