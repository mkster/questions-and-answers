import React, { useEffect, useState } from 'react';
import { useAllQuestions } from '../util/apiHelper';
import Hider from "./Hider";
import Question from './Question';
import QuestionAsker from "./QuestionAsker";
import UserQuestions from './UserQuestions';

/*
css solution?
try to maintain a more clean folder architecture, what do you think about creating a hooks folder for example? You have hooks in util and in components.

At work if we have a unique component for a use case, we usually put all of the necessary props right inside of it. E.g. <QuizInput /> would have all of the inputProps inside of it.
In your use case stuff is not compartmentalized according to my mental model, where you have components that do presentation and hooks that do business logic - your hooks do everything and you don't have a layer that separates global-ish state from local state.
OR  useInputProps()

display loading? buttons take long to appear
you provide the question with a input bar so that I cannot type, you also provide the answers below.. if you just want to provide the questions and answers then remove the input bar
you should add a search bar

*/

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