import React, { Component, useState, useEffect } from 'react'
import './App.css';
import APIHelper, {useAllQuestions, useAnswers} from "./APIHelper.js"


import { Card, Button, Row, Col } from 'antd';
import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';
import { Typography, Divider } from 'antd';
import { connect } from 'react-redux';
import QuestionAsker from './Components/QuestionAsker';
import QuestionAnswerer from './Components/QuestionAnswerer';
const { Title, Paragraph, Text  } = Typography;


export default function App() {
  const [questions, updateQuestions] = useAllQuestions();
  //onQuestionAsked is a bad way since it may not be ready should instead put all Qs into redux and update store when quesion asked?
  return (
    <div >
      {questions.map(q=>
        <Question key={q._id} question={q}/>
      )}
      <p />
      <p />
      <p />
      <p />
      <QuestionAsker onQuestionAsked={updateQuestions}/>
    </div>
  );
}

function Question(props){
  const question = props.question;
  const [answers, updateAnswers] = useAnswers(question._id);
  return (
    <div >
      <h3>{question.question}</h3>
      <QuestionAnswerer questionID = {question._id} onQuestionAnswered={updateAnswers}/>
      {answers.map(a =>
        <p key={a._id}>{a.answer}</p>
      )}
    </div>
  );
}


