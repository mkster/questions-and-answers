import React, { Component, useState, useEffect } from 'react'
import './App.css';
import APIHelper, {useAllQuestions, useAnswers} from "./APIHelper.js"
import { Card, Button, Row, Col } from 'antd';
import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';
import { Typography, Divider } from 'antd';
import { connect } from 'react-redux';
import QuestionAsker from './Components/QuestionAsker';
import QuestionAnswerer from './Components/QuestionAnswerer';
import { configConsumerProps } from 'antd/lib/config-provider';
const { Title, Paragraph, Text  } = Typography;


function useInterval(func, t=10){
  let interval;
  useEffect(()=>{
    interval = setInterval(func, t);
    return () => { clearInterval(interval);}
  }, [])

  return interval
}

export default function App() {
  const [questions, setQuestions, fetchQuestions] = useAllQuestions();
  
  function onQuestionAsked(addition) {
    console.log("add" + addition)
    if (addition != []) {
      setQuestions([...questions, addition])
    }
  }

  return (
    <div >
      <h1>Answer Questions</h1>
      {questions.map(q=>
        <Question key={q._id} question={q}/>
      )}
      <p />
      <p />
      <p />
      <p />
      <h1>Ask a Question</h1>
      <QuestionAsker onQuestionAsked={onQuestionAsked}/>
    </div>
  );
}

function Question(props){
  const question = props.question;
  const [answers, setAnswers, fetchAnswers] = useAnswers(question._id);

  function onQuestionAnswered(addition){
    if (addition != []){
      setAnswers([...answers, addition])
    }
  }

  return (
    <div >
      <h3>{question.question}</h3>
      <QuestionAnswerer questionID={question._id} onQuestionAnswered={onQuestionAnswered}/>
      {answers.map(a =>
        <p key={a._id}>{a.answer}</p>
      )}
    </div>
  );
}


