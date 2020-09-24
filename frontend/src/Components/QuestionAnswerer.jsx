import { Button, Space } from 'antd';
import React, { useEffect } from 'react';
import { postAnswer } from '../APIHelper';
import useInput from './useInput';


//make component Input and combine with button here
export default function QuestionAnswerer (props) {
    const styleInput = {}
    const propsInput = { style: styleInput, size: "large", disabled: props.questionAnswered, onPressEnter: confirmInput }
    const [input, inputStr, setInputStr] = useInput(propsInput)

    //if new question set not answered
    useEffect(() => {
        setInputStr("")
    }, [props.questionID])

    function confirmInput(){
        postAnswer(props.questionID, inputStr).then(res=>{
            props.onQuestionAnswered(res)
        })
        //setInputStr("");
    }

    function onQuestionCompleted(){
        props.onQuestionCompleted()
    }

    const styleSpace = {
        width: "100%"
    }

    const questionAnswerButtons = 
        <Space style={styleSpace} size={"small"} direction="horizontal">
            <Button disabled={inputStr == ""} onClick={confirmInput}>Answer</Button>
            <Button onClick={onQuestionCompleted}>Skip</Button>
        </Space>
    
    return (
        <div>
            <Space style={styleSpace} size={"large"} direction="vertical">
                {input}
                {!props.questionAnswered && questionAnswerButtons}
                {props.questionAnswered && <Button onClick={onQuestionCompleted}>Next Question</Button>}
            </Space>
        </div>
    )
}




