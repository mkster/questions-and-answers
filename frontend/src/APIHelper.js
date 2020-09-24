
import { useEffect, useState } from 'react';
const axios = require('axios').default;
const backend = ''//'http://localhost:3001/' //this is done by "proxy" in package.json

const currentUserID = 1; //TODO I guess normally the backedn should know current user instead of passing it here

export function useAllQuestions() {
    const url = backend + "questions"
    return useGet(url)
}


export function useAnswers(questionID) {
    const url = backend + `question/${questionID}/answers`
    console.log("useAnswers" + questionID)
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
    const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

    useEffect(()=>{
        updateGetNetwork()
        //return (cancelToken.cancel) //cancel ongoing request on unmount/rerender
    }, [url])

    //fetch from backend
    function updateGetNetwork(){
        console.log("getting "+ url);
        const token = cancelToken.token;
        axios.get(url, {cancelToken: token}).then(result => {
            console.log("get suc " + result.data);
            setResponse(result.data)
        }, failReason => {
            //failed
            //dont set state on cancled request since the component is already unmounted
            if (!axios.isCancel(failReason)) {
                console.log("get fail " + failReason);
                setResponse([])
            }else{
                console.log("axious cancel get")
            }
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
    console.log("posting " + url + " " + data);
    const res = axios.post(url, data).then(result => {
        console.log("post sucess " + result.data);
        return result.data
    }, failReason => {
        //failed
        console.log("post fail " + failReason);
        return []
    })
    return res;
}



export default {};
