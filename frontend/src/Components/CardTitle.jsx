import { Card, Typography } from 'antd';
import React from 'react';

export default function CardTitle(props){
    const styleParent ={
        maxWidth: 420,
        margin: "auto",
    }
    const styleCard = {
        marginLeft: 10,
        marginRight: 10,
        maxWidth: 400,
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