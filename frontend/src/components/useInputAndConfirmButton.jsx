
import { Button } from 'antd';
import useInput from './useInput';

//use Input (antd), auto capitalizes first char, return confirm button with enter press confirm and gray out when input is empty (antd) 
export default function useInputAndConfirmButton(onConfirmInput) {
    const [Input, inputProps, inputStr, setInputStr] = useInput()
    const extendedProps = { ...inputProps, onPressEnter: confirmInput}

    function confirmInput() {
        onConfirmInput(inputStr)
    }
    const confirmButtonProps = {disabled : inputStr === "", onClick : confirmInput} 

    return [Input, extendedProps, inputStr, setInputStr, Button, confirmButtonProps]
}


