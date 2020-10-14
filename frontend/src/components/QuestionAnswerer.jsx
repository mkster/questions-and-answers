import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import CardTitle from './CardTitle';
import SpaceFullWidth from './SpaceFullWidth';
import useInputAndConfirmButton from './useInputAndConfirmButton';

// make component Input and combine with button here
export default function QuestionAnswerer(props) {
  const [Input, inputProps, , , ConfirmButton, confirmButtonProps] = useAnswerInput(props.questionID, props.questionAnswered, props.onQuestionAnswered);

  const questionAnswerButtons = (
    <SpaceFullWidth size="small" direction="horizontal">
      <ConfirmButton {...confirmButtonProps}>Answer</ConfirmButton>
      <Button onClick={props.onQuestionCompleted}>Skip</Button>
    </SpaceFullWidth>
  );

  return (
    <QuestionCard title={props.questionTitle} >
      <SpaceFullWidth  size="large" direction="vertical">
        <Input size='large' {...inputProps} />
        <DivBottom height={40}>
          {
            props.questionAnswered === null 
              ? null
              : !props.questionAnswered
                ? questionAnswerButtons
                : <Button onClick={props.onQuestionCompleted}>Next Question</Button>
          }
        </DivBottom>
      </SpaceFullWidth>
    </QuestionCard>
  );
}

//positions content at bottom of parent
function DivBottom(props){
  const height = props.height
  return (
    <BottomSpace height={height}>
      <BottomSpaceContent height={height}>
        {props.children}
      </BottomSpaceContent>
    </BottomSpace>
  )
}

const BottomSpace = styled.div`
  height: ${props=>props.height}px;
`
const BottomSpaceContent = styled.div`
  position: absolute;
  bottom: 20px;
  height: ${props =>props.height}px;
`
const QuestionCard = styled(CardTitle)`
  min-height: 350px;
`

function useAnswerInput(questionID, questionAnswered, onQuestionAnswered) {
  const inputRef = useRef(null);
  const [input, inputProps, inputStr, setInputStr, ConfirmButton, confirmButtonProps] = useInputAndConfirmButton(confirmInput);
  const extendedInputProps = { ...inputProps, ref: inputRef, disabled: questionAnswered, onPressEnter: confirmInput}

  // if new question set not answered
  useEffect(() => {
    setInputStr('');
    // inputRef.current.focus();
  }, [questionID, setInputStr]);

  function confirmInput() {
    onQuestionAnswered(inputStr);
  }

  return [input, extendedInputProps, inputStr, confirmInput, ConfirmButton, confirmButtonProps];
}
