import React, { Component, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { postQuestion } from '../APIHelper';


//make component Input and combine with button here
export default function QuestionAsker (props) {
    const [inputStr, setInputStr] = useState("")

    function handleChange(event) {
        const str = event.target.value;
        setInputStr(str);
    }

    function onButtonPressed(){
        postQuestion(inputStr).then(res => {
            props.onQuestionAsked(res)
        })
        setInputStr("");
    }
    
    return (
        <div>
            <input type="text" value={inputStr} onChange={handleChange}/>
            <button onClick={()=>onButtonPressed(inputStr)}>Ask</button>
        </div>
    )
}



