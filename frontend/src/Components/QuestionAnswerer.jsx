import React, { Component, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { postAnswer } from '../APIHelper';


//make component Input and combine with button here
export default function QuestionAnswerer (props) {
    const [inputStr, setInputStr] = useState("")

    function handleChange(event) {
        const str = event.target.value;
        setInputStr(str);
    }

    function onButtonPressed(){
        postAnswer(props.questionID, inputStr).then(res=>{
            props.onQuestionAnswered(res)
        })
        setInputStr("");
    }
    
    return (
        <div>
            <input type="text" value={inputStr} onChange={handleChange}/>
            <button onClick={()=>onButtonPressed()}>Answer</button>
        </div>
    )
}



