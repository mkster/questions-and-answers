
import React from 'react'

export default function Hider(props){
    const styleVisible = {}
    const styleHidden = {
        display: "none"
    }
    const style = props.hidden ? styleHidden : styleVisible
    return (
        <div style = {style}>
            {props.children}
        </div>
    )
}