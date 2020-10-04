
import { Button } from 'antd';
import React from 'react';
import useInput from './useInput';

//use Input (antd), auto capitalizes first char, return confirm button with enter press confirm and gray out when input is empty (antd) 
export default function useInputAndConfirmButton(propsInput, onConfirmInput) {
    const props = { onPressEnter: confirmInput, ...propsInput }
    const [input, inputStr, setInputStr] = useInput(props)

    function confirmInput() {
        onConfirmInput(inputStr)
    }
    function ConfirmButton(props){
        return (
            <Button disabled={inputStr === ""} onClick={confirmInput} {...props.propsButton}>
                {props.children}
            </Button>
        )
    }

    return [input, inputStr, setInputStr, ConfirmButton]
}


