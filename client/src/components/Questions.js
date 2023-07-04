import React from 'react';
import { useState,useEffect } from 'react';
//import {questionReducer} from './redux/question_reducer.js';

//custom hook
import {useFetchQuestion} from '../hooks/FetchQuestion.js';
import { updateResultAction } from '../redux/result_reducer.js';
import { useSelector,useDispatch } from 'react-redux';

import { updateResult } from '../hooks/setResult.js';
export default function Questions({onChecked}) {
    const[checked,setChecked]=useState(undefined)
    const {trace}=useSelector(state=>state.questions);
    const result=useSelector(state=>state.result.result);
    const [{isLoading,apiData,serverError}]=useFetchQuestion()
    
    const questions=useSelector(state=>state.questions.queue[state.questions.trace])
    const dispatch=useDispatch()
    useEffect(()=>{
        console.log({trace,checked})
        dispatch(updateResult({trace,checked}))
    },[checked])

    function onSelect(i){
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({trace,checked}))
    }
    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
  return (
    <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>  
        {/* ? is used we can access that only when we have that property. */}
        <ul key={questions?.id}>
            {
                questions?.options.map((q,i)=>(
                    <li key={i}>
                <input 
                type="radio"
                value={false}
                name="options"
                id={`q${i}-option`}
                onChange={()=>onSelect(i)}
                />
                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                <div className={`check ${result[trace]===i ? 'checked':''}`}></div>
            </li>
                ))
            }
        </ul> 
    </div>
  )
   }