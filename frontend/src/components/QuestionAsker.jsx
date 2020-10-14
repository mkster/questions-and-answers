import React from 'react';
import { postQuestion } from '../util/apiHelper';
import useUserID from '../util/useUserID';
import CardTitle from './CardTitle';
import SpaceFullWidth from './SpaceFullWidth';
import useInputAndConfirmButton from './useInputAndConfirmButton';


// make component Input and combine with button here
export default function QuestionAsker(props) {
  const [Input, inputProps, ConfirmButton, confirmButtonProps] = useAskQuestion(props.onQuestionAsked);

  return (
    <CardTitle title="Ask a Question">
      <SpaceFullWidth size="large" direction="vertical">
        <Input size='large' {...inputProps}/>
        <ConfirmButton {...confirmButtonProps}>Ask</ConfirmButton>
      </SpaceFullWidth>
    </CardTitle>
  );
}

function useAskQuestion(onQuestionAsked) {
  const [Input, inputProps, inputStr, setInputStr, ConfirmButton, confirmButtonProps] = useInputAndConfirmButton(confirmInput);
  const userID = useUserID();
  const extendedInputProps = {...inputProps, onPressEnter : confirmInput}

  function confirmInput() {
    const str = addPostfix(inputStr, '?');
    postQuestion(str, userID).then((res) => {
      onQuestionAsked(res);
    });
    setInputStr('');
  }

  return [Input, extendedInputProps, ConfirmButton, confirmButtonProps];
}

// add 1 char postix
function addPostfix(string, postfix) {
  const last = string.slice(-1);
  if (last === postfix) { return string; }
  return string + postfix;
}
