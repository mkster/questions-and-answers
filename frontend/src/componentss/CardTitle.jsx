import { Card, Typography } from 'antd';
import React from 'react';

export default function CardTitle(props){
    const maxSize = 500
    const margin = 10;
    const styleParent ={
        maxWidth: maxSize + margin*2,
        margin: "auto",
    }
    const styleCard = {
        marginLeft: margin,
        marginRight: margin,
        maxWidth: maxSize,
        ...props.style
    }

    return (
        <div style={styleParent}>
            <Card style={styleCard}>
                <Typography>
                    <Typography.Title level={2}> {props.title}</Typography.Title>
                </Typography>
                {props.children}
            </Card>
        </div>
    )
}