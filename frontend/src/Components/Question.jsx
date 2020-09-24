import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAnswers } from '../APIHelper';
import CardTitle from './CardTitle';
import Hider from './Hider';
import QuestionAnswerer from './QuestionAnswerer';

//get the next question for this user?
function useNextQuestion(questions){

}

//only show answerer, then reavel answrs once answered
export default function Question(props) {
  const question = props.question;
  const [answers, setAnswers, fetchAnswers] = useAnswers(question._id);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  //if new question set not answered
  useEffect(()=>{
    setQuestionAnswered(false)
  }, [question._id])

  function onQuestionAnswered(addition) {
    if (addition != []) {
      setAnswers([...answers, addition])
    }
    setQuestionAnswered(true);
    //props.onQuestionCompleted();
  }

  //todo
  function onQuestionSkipped(addition) {
    props.onQuestionCompleted();
  }

  const styleSpace = {
    width: "100%"
  }

  return (
    <div >
      <br/>
      <CardTitle title={question.question} >
        <Space style={styleSpace} size={"large"} direction="vertical">
          <QuestionAnswerer questionID={question._id} questionAnswered={questionAnswered} onQuestionAnswered={onQuestionAnswered} onQuestionCompleted={props.onQuestionCompleted} />
        </Space>
      </CardTitle>

      <br/>
      {!questionAnswered && <CardTitle title={"Answer to see Answers"} />}
      <Hider hidden={!questionAnswered}>
        <CardTitle title={"Answers"} >
          <QuestionAnswers answers={answers} />
        </CardTitle>
      </Hider>


    </div>
  );
}

function QuestionAnswers(props){
  return(
      props.answers.map(a =>
        <p key={a._id}>{a.answer}</p>
      )
  )
}
