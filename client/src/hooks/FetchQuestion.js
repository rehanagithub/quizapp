//fetch question hook to fetch api data and set value to store.
import { useState,useEffect } from "react";
// import data,{answers}from '../database/data.js';
import { useDispatch } from "react-redux";
//redux action
import * as Action from '../redux/question_reducer.js';
import { getServerData } from "../helper/helper.js";
//fetch question hook to fetch api data and set value to store.
export const useFetchQuestion=()=>{   //as this is a custom hook so we want to use 'use' before the function name.
    const dispatch=useDispatch();
    const[getData,setGetData]=useState({isLoading:false,apiData:[],serverError:null})
    useEffect(()=>{
        //setGetData(prev=>({...prev,isLoading:true}))

        //async function to fetch backend data.
        (async()=>{
            try{
                  const [{questions,answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data)
              console.log({questions,answers})
                   if(questions.length>0){
                    setGetData(prev=>({...prev,isLoading:false}));
                    setGetData(prev=>({...prev,apiData:questions}));
                    //dispatch an action-allows to call an action and to update store.
                    dispatch(Action.startExamAction({question:questions,answers}))
                   }
                   else{
                    throw new Error("No question available");
                   }
            }catch(error){
                  setGetData(prev=>({...prev,isLoading:false}));
                  setGetData(prev=>({...prev,serverError:error}));
            }

        })();   
    },[dispatch]);   //pass dispatch as a ddependency to loop through on it.
    return [getData,setGetData];
}


//move action dispatch

export const MoveNextQuestion=()=>async(dispatch)=>{
    try{
         dispatch(Action.moveNextAction());   //increase trace by 1.
    }catch(error){
        console.log(error)
    }
}
// //prev action dispatch function.
export const MovePrevQuestion=()=>async(dispatch)=>{
    try{
         dispatch(Action.movePrevAction());   //decrease trace by 1.
    }catch(error){
        console.log(error)
    }
}