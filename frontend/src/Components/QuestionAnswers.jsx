
import { Typography } from 'antd';
import React from 'react';
import useUserID from './../Util/useUserID';
import CardTitle from './CardTitle';

export default function QuestionAnswers(props){
  //const n = props.answers === null ? "_" : props.answers.length;
  //const title = `Answer to see ${n} Answers`
  const userID = useUserID()
  return(
    <>
      {!props.questionAnswered ? 
        <CardTitle title={`Answer to see Answers`} />
      :
        <CardTitle title={"Answers"} >
          <Typography>
          {props.answers ? props.answers.map(a =>
            <Typography.Paragraph key={a._id}>
              {userID === a.authorID ? <b>{a.answer}</b>: a.answer}
            </Typography.Paragraph>
          ): null}
          </Typography>
        </CardTitle>
      }
    </>
  )
}