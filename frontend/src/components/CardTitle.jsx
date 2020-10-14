import { Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

export default function CardTitle(props){
    const maxSize = 500
    const margin = 10;

    //passing props.style/className through to card instead of parent helper component
    return (
        <CardParent margin={margin} maxSize={maxSize}>
            <CardSideMargin className={props.className} style={props.style} margin={margin} >
                <Typography>
                    <Typography.Title level={2}> {props.title}</Typography.Title>
                </Typography>
                {props.children}
            </CardSideMargin>
        </CardParent>
    )
}

//ensure a little margin if card would stretch full screen width 
const CardParent = styled.div(props => ({
    maxWidth: props.maxSize + props.margin * 2,
    margin: "auto",
}))

const CardSideMargin = styled(Card)(props => ({
    marginLeft: props.margin,
    marginRight: props.margin,
}))