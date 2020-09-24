import { Button, Space } from 'antd';
import React from 'react';
import { postQuestion } from '../APIHelper';
import CardTitle from './CardTitle';
import useInput from './useInput';

//Generally, reusable components go into their own files whereas components that are dependent on each other for a specific purpose go in the same file


//make component Input and combine with button here
export default function QuestionAsker (props) {
    //const [inputStr, setInputStr] = useState("")
    const styleInput = {}
    const propsInput = { style: styleInput, size: "large", onPressEnter: confirmInput}
    const [input, inputStr, setInputStr] = useInput(propsInput)

    function confirmInput(){
        const str = addPostfix(inputStr, "?")
        postQuestion(str).then(res => {
            props.onQuestionAsked(res)
        })
        setInputStr("");
    }

    const styleSpace = {
        width: "100%"
    }
    const styleCenter = {
        //margin: 0,
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
    }
    
    //TODO center card vertically
    //TODO use ref to focus input rigth awya
    //TODO make this useInputConfirm(buttonText) or so
    return (
        <div>
            <br/>
            <CardTitle title="Ask a Question" >
                <Space style={styleSpace} size={"large"} direction="vertical">
                    {input}
                    <Button disabled={inputStr==""} onClick={confirmInput}>Ask</Button>
                </Space>
            </CardTitle>
        </div>
    )
}

//add 1 char postix
function addPostfix(string, postfix) {
    const last = string.slice(-1)
    if (last == postfix) { return string }
    return string + postfix
}

