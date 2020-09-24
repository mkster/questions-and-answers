import { Button, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import CardTitle from './CardTitle';
import useInputAndConfirmButton from './useInputAndConfirmButton';

//container: lifecycle methods, logic
//display: all methods adn  value from props


//make component Input and combine with button here
export default function QuestionAnswerer (props) {
    const [input, inputStr, confirmInput, ConfirmButton] = useAnswerInput(props.questionID, props.questionAnswered, props.onQuestionAnswered)

    const styleSpace = {
        width: "100%"
    }
    const styleQuestionCard = {
        minHeight: 350,
    }
    const bottomSpace = 40;
    const styleBottomSpace = {
        height: bottomSpace,
    }
    const stylePostionInBottomSpace = {
        position: "absolute",
        bottom: 20,
        height: bottomSpace,
    }

    const questionAnswerButtons = 
        <Space style={styleSpace} size={"small"} direction="horizontal">
            <ConfirmButton>Answer</ConfirmButton>
            <Button onClick={props.onQuestionCompleted}>Skip</Button>
        </Space>
    
    return (
        <CardTitle title={props.questionTitle} style={styleQuestionCard} >
            <Space style={styleSpace} size={"large"} direction="vertical">
                <Space style={styleSpace} size={"large"} direction="vertical">
                    {input}
                    <div style={styleBottomSpace}>
                        <div style={stylePostionInBottomSpace}>
                            {!props.questionAnswered ? 
                                questionAnswerButtons : 
                                <Button onClick={props.onQuestionCompleted}>Next Question</Button>
                            }
                        </div>
                    </div>
                </Space>
            </Space>
        </CardTitle>
    )
}

function useAnswerInput(questionID, questionAnswered, onQuestionAnswered){
    const styleInput = {}
    const inputRef = useRef(null)
    const propsInput = { style: styleInput, ref: inputRef, size: "large", disabled: questionAnswered, onPressEnter: confirmInput }
    const [input, inputStr, setInputStr, ConfirmButton] = useInputAndConfirmButton(propsInput, confirmInput)

    //if new question set not answered
    useEffect(() => {
        setInputStr("")
        inputRef.current.focus();
    }, [questionID])

    function confirmInput() {
        onQuestionAnswered(inputStr)
    }

    return [input, inputStr, confirmInput, ConfirmButton]
}




