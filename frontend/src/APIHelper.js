
import React, { Component, useState, useEffect } from 'react'
const axios = require('axios').default;
const backend = 'http://localhost:3001/'

const currentUserID = 1; //TODO I guess normally the backedn should know current user instead of passing it here

export function useAllQuestions() {
    const url = backend + "questions"
    return useGet(url)
}


export function useAnswers(questionID) {
    const url = backend + `question/${questionID}/answers`
    return useGet(url)
}

export function useAnswerBy(questionID, authorID) {
    const url = backend + `question/${questionID}/answers/${authorID}`
    return useGet(url)
}

export async function postQuestion(questionText) {
    const authorID = currentUserID;
    const answerData = { question: questionText, authorID: authorID }
    const url = backend + `question`
    return await post(url, answerData)
}

export async function postAnswer(questionID, answerText) {
    const authorID = currentUserID;
    const answerData = { answer: answerText, questionID: questionID, authorID : authorID}
    const url = backend + `answer`
    return await post(url, answerData)
}

//returns [] or result and function to refresh result
function useGet(url){
    const [response, setResponse] = useState([]);
    useEffect(updateGet, [url])

    function updateGet(){
        axios.get(url).then(result => {
            setResponse(result.data)
        }, failReason => {
            //failed
            setResponse([])
        })
    }

    return [response, updateGet]
}


//returns [] or result
async function post(url, data) {
    axios.post(url, data).then(result => {
        return result.data
    }, failReason => {
        //failed
        return []
    })
}



export default {};
