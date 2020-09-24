import React, { useState } from 'react';
import { useAllQuestions } from './../APIHelper';
import Hider from "./Hider";
import Question from './Question';
import QuestionAsker from "./QuestionAsker";

export default function QAContent(props){
    const [question, goToNextQuestion, onQuestionAsked] = useCurrentQuestion(props.onQuestionAsked)

    //using hider to not rerender and loose state
    return(
        <div>
            <Hider hidden={props.navigationSelection !== "ask"}>
                <QuestionAsker onQuestionAsked={onQuestionAsked} />
            </Hider>
            <Hider hidden={props.navigationSelection !== "answer"}>
                {question && <Question onQuestionCompleted={goToNextQuestion} question={question} />}
            </Hider>
        </div>
    )
}


function useCurrentQuestion(_onQuestionAsked){
    const [questions, setQuestions, fetchQuestions] = useAllQuestions();
    const [iCurrentQuestion, setICurrentQuestion] = useState(6); //nope this needs to stay when switching tabs, router? or higher state?

    //TODO going backwards throug Q latest Q first
    function goToNextQuestion() {
        const i = (iCurrentQuestion + 1) % questions.length;
        setICurrentQuestion(i)
    }

    //update questions without fetching everything
    function onQuestionAsked(addition) {
        if (addition !== []) {
            setICurrentQuestion(questions.length) //select that question
            setQuestions([...questions, addition])
            _onQuestionAsked();
        }
    }

    const question = questions[iCurrentQuestion]
    return [question, goToNextQuestion, onQuestionAsked]
}