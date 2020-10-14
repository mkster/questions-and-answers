import { Button } from 'antd';
import React from 'react';
import { deleteQuestion, useAnswers, useQuestionsBy } from '../util/apiHelper';
import useUserID from '../util/useUserID';
import CardTitle from './CardTitle';
import QuestionAnswers from './QuestionAnswers';

export default function UserQuestions(props) {
  const id = useUserID();
  const [questions, setQuestions] = useQuestionsBy(id);

  function _deleteQuestion(i) {
    deleteQuestion(questions[i]._id);
    const copy = [...questions];
    copy.splice(i, 1);
    setQuestions(copy);
  }

  return (
    !questions 
      ? null
      : questions.length > 0
        ? questions.map((question, i) => (
            <React.Fragment key={question._id}>
              <br />
              <UserQuestion deleteQuestion={() => _deleteQuestion(i)} question={question} />
            </React.Fragment>
          ))
        : <CardTitle title="You have asked no questions" />
  );
}

function UserQuestion(props) {
  const [answers, , ] = useAnswers(props.question._id, null);

  return (
    <>
      <CardTitle title={props.question.question}>
        <Button onClick={props.deleteQuestion}>Delete</Button>
      </CardTitle>
      <br />
      <QuestionAnswers questionAnswered answers={answers} />
    </>
  );
}
