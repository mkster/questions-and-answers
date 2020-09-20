
import { useState, useEffect } from 'react'
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
    const res = await post(url, answerData)
    return res;
}

//could call this useStateFetched, TODO maybe return soemthign different for error and not fetched yet
//returns [] or result and function to refresh result
function useGet(url, intialState = []){
    const [response, setResponse] = useState(intialState);
    useEffect(()=>{
        updateGetNetwork()
        //should return cancel axios func here
    }, [url])

    //fetch from backend
    function updateGetNetwork(){
        console.log("getting"+ url);
        axios.get(url).then(result => {
            console.log("get suc " + result.data);
            setResponse(result.data)
        }, failReason => {
            //failed
            console.log("get fail");
            setResponse([])
        })


    }

    //set value manually for example if user added new data locla but hasent fetched yet
    function updateLocal(set){
        setResponse(set);
    }

    return [response, updateLocal, updateGetNetwork]
}


//returns [] or result
async function post(url, data) {
    console.log("posting" + url + " " + data);
    const res = axios.post(url, data).then(result => {
        console.log("post sucess" + result.data);
        return result.data
    }, failReason => {
        //failed
        console.log("post fail");
        return []
    })
    return res;
}



export default {};
