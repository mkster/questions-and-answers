import { Input } from 'antd';
import { useState } from 'react';

// TODO make this useInputProps()

// use Input (antd), auto capitalizes first char
export default function useInput() {
  const [inputStr, setInputStr] = useState('')

  function handleChange(event) {
    const str = firstCharUppercase(event.target.value);
    setInputStr(str);
  }

  // return element not component to avoid creating new instances that loose focus etc
  const inputProps = { value : inputStr , onChange : handleChange }
  return [Input, inputProps, inputStr, setInputStr];
}

function firstCharUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
