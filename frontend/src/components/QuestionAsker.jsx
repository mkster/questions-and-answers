import { Space } from 'antd';
import React from 'react';
import { postQuestion } from '../util/apiHelper';
import useUserID from '../util/useUserID';
import CardTitle from './CardTitle';
import useInputAndConfirmButton from './useInputAndConfirmButton';

// make component Input and combine with button here
export default function QuestionAsker(props) {
  const [input, ConfirmButton] = useAskQuestion(props.onQuestionAsked);

  const styleSpace = {
    width: '100%',
  };

  return (
    <CardTitle title="Ask a Question">
      <Space style={styleSpace} size="large" direction="vertical">
        {input}
        <ConfirmButton>Ask</ConfirmButton>
      </Space>
    </CardTitle>
  );
}

function useAskQuestion(onQuestionAsked) {
  const propsInput = { size: 'large', onPressEnter: confirmInput };
  const [input, inputStr, setInputStr, ConfirmButton] = useInputAndConfirmButton(propsInput, confirmInput);
  const userID = useUserID();

  function confirmInput() {
    const str = addPostfix(inputStr, '?');
    postQuestion(str, userID).then((res) => {
      onQuestionAsked(res);
    });
    setInputStr('');
  }

  return [input, ConfirmButton];
}

// add 1 char postix
function addPostfix(string, postfix) {
  const last = string.slice(-1);
  if (last === postfix) { return string; }
  return string + postfix;
}
