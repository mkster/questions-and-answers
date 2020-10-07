import { Input } from 'antd';
import React, { useState } from 'react';

// TODO make this useInputProps()

// use Input (antd), auto capitalizes first char
export default function useInput(props) {
  const [inputStr, setInputStr] = useState('')

  function handleChange(event) {
    const str = firstCharUppercase(event.target.value);
    setInputStr(str);
  }

  // if this is a function it keeps loosign focus for some reason
  const input = <Input value={inputStr} onChange={handleChange} {...props} />
  return [input, inputStr, setInputStr];
}

function firstCharUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


