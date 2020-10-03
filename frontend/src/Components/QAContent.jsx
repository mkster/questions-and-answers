import React, { useEffect, useState } from 'react';
import { useAllQuestions } from '../util/apiHelper';
import Hider from "./Hider";
import Question from './Question';
import QuestionAsker from "./QuestionAsker";
import UserQuestions from './UserQuestions';

export default function QAContent(props){
    const [question, goToNextQuestion, onQuestionAsked] = useCurrentQuestion(props.onQuestionAsked)

    const styleDiv = {
        marginTop : "25px",
    }

    //using hider to not rerender and loose state
    return(
        <div style={styleDiv}>
            <Hider hidden={props.navigationSelection !== "ask"}>
                <QuestionAsker onQuestionAsked={onQuestionAsked} />
            </Hider>
            <Hider hidden={props.navigationSelection !== "answer"}>
                {question && <Question onQuestionCompleted={goToNextQuestion} question={question} />}
            </Hider>
            {props.navigationSelection === "userQuestions" && <UserQuestions/>}
        </div>
    )
}

function useCurrentQuestion(_onQuestionAsked){
    const [questions, setQuestions, ] = useAllQuestions();
    const [iCurrentQuestion, setICurrentQuestion] = useState(-1);

    //when questions ready set curretn question to latest question
    useEffect(()=>{
        const readyToInit = iCurrentQuestion === -1 && questions != null
        if (readyToInit) setICurrentQuestion(questions.length-1)
    }, [questions, iCurrentQuestion])

    //going backwards throug Qs latest Q first
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

    const question = questions && questions[iCurrentQuestion]
    return [question, goToNextQuestion, onQuestionAsked]
}