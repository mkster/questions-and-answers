
import { useEffect, useState } from 'react';
const axios = require('axios').default;

export function useAllQuestions() {
    const url = "questions"
    return useGet(url)
}

export function useQuestionsBy(authorID) {
    const url = `questions?authorID=${authorID}`
    return useGet(url)
}

export function useAnswers(questionID) {
    const url = `questions/${questionID}/answers`
    return useGet(url) 
}

export function useAnswerBy(questionID, authorID) {
    const url = `questions/${questionID}/answers/${authorID}`
    return useGet(url)
}

export async function postQuestion(questionText, authorID) {
    const answerData = { question: questionText, authorID: authorID }
    const url = `questions`
    return await post(url, answerData)
}

export async function postAnswer(questionID, answerText, authorID) {
    const answerData = { answer: answerText, questionID: questionID, authorID : authorID}
    const url = `answers`
    const res = await post(url, answerData)
    return res;
}

export async function deleteQuestion(questionID) {
    const url = `questions/${questionID}`
    return await del(url)
}

//could call this useStateFetched
//returns [] or result and function to refresh result
function useGet(url, intialState = null){
    const [response, setResponse] = useState(intialState);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        //fetch from backend
        function updateGetNetwork(cancelToken) {
            const token = cancelToken.token;
            axios.get(url, { cancelToken: token }).then(result => {
                setResponse(result.data)
            }, failReason => {
                //failed
                //dont set state on cancled request since the component is already unmounted
                if (!axios.isCancel(failReason)) {
                    //console.log("get fail " + failReason);
                    setResponse([])
                } else {
                }
            })
        }
        setResponse(intialState) //reset response to inital state
        const newToken = axios.CancelToken.source()
        updateGetNetwork(newToken)
        return (newToken.cancel) //cancel ongoing request on unmount/rerender
    }, [refresh, url, intialState])

    
    //set value manually for example if user added new data locla but hasent fetched yet
    function updateLocal(set){
        setResponse(set);
    }

    function doRefresh(){
        //force update by changing useEffect dep
        setRefresh(!refresh);
    }

    return [response, updateLocal, doRefresh]
}


//returns [] or result
async function post(url, data) {
    const res = axios.post(url, data).then(result => {
        return result.data
    }, failReason => {
        //failed
        //console.log("post fail " + failReason);
        return null
    })
    return res;
}

async function del(url) {
    const res = axios.delete(url).then(result => {
        return result.data
    }, failReason => {
        //failed
        //console.log("del fail " + failReason);
        return []
    })
    return res;
}


export default {};
