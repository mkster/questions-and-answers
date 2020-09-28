
import { Button } from 'antd';
import React from 'react';
import { deleteQuestion, useAnswers, useQuestionsBy } from '../APIHelper';
import useUserID from './../Util/useUserID';
import CardTitle from './CardTitle';
import QuestionAnswers from './QuestionAnswers';

export default function UserQuestions(props){
    const id = useUserID()
    const [questions, setQuestions, doRefresh] = useQuestionsBy(id)

    function deleteThisQuestion(i) {
        deleteQuestion(questions[i]._id)
        const copy = [...questions]
        copy.splice(i,1)
        setQuestions(copy)
    }

    return (
        !questions ? null : 
        questions.length > 0 ?
            questions.map((question, i)=>
                <div key={question._id}>
                    <br/>
                    <UserQuestion deleteQuestion={()=>deleteThisQuestion(i)} question={question}/>
                </div>
            )
        :
            <div>
            <br/>
            <CardTitle title={"You have asked no questions"}/>
            </div>
    )
}

function UserQuestion(props){
    const [answers, setAnswers, fetchAnswers] = useAnswers(props.question._id, null);

    return (
        <div>
            <CardTitle title={props.question.question}>
                <Button onClick={props.deleteQuestion}>Delete</Button>
            </CardTitle>
            <br/>
            <QuestionAnswers questionAnswered={true} answers={answers} />
        </div>
    )
}