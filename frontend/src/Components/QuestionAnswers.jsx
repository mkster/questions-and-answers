
import React from 'react';
import useUserID from './../Util/useUserID';
import CardTitle from './CardTitle';

export default function QuestionAnswers(props){
  //const n = props.answers === null ? "_" : props.answers.length;
  //const title = `Answer to see ${n} Answers`
  const userID = useUserID()
  return(
    <div>
      {!props.questionAnswered ? 
        <CardTitle title={`Answer to see Answers`} />
      :
        <CardTitle title={"Answers"} >
          {props.answers ? props.answers.map(a =>
            <p key={a._id}>
              {userID === a.authorID ? <b>{a.answer}</b>: a.answer}
            </p>
          ): null}
        </CardTitle>
      }
    </div>
  )
}